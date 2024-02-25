import {
  Button,
  Flex,
  Input,
  List,
  ThemeIcon,
  rem,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { json, type MetaFunction } from "@remix-run/node";
import {
  ClientActionFunctionArgs,
  useActionData,
  useFetcher,
  useLoaderData,
} from "@remix-run/react";
import {
  IconCircleCheck,
  IconCircleDashed,
  IconBucket,
  IconPencil,
} from "@tabler/icons-react";
import { AxiosError } from "axios";
import { useState } from "react";
import EditModal from "~/components/editModal";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getCsrfToken,
  updateTask,
} from "~/utils/data";
import { Task } from "~/utils/types";
import { z } from "zod";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix SPA" },
    { name: "description", content: "Welcome to Remix (SPA Mode)!" },
  ];
};

const Schema = z.object({
  title: z
    .string()
    .min(1, { message: "タイトルを入力してください" })
    .max(64, { message: "64文字未満にしてください" }),
});

export default function About() {
  const { tasks } = useLoaderData<typeof clientLoader>();
  // const actionData = useActionData<typeof clientAction>();
  // const validationMessages = actionData?.validationMessages;
  const fetcher = useFetcher();
  const [isShowModal, { open, close }] = useDisclosure(false);
  const [selectedTask, setSelectedTask] = useState<Task>();
  const handleOpenModal = (task: Task) => {
    setSelectedTask(task);
    open();
  };
  const handleCloseModal = () => {
    setSelectedTask(undefined);
    close();
  };

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <fetcher.Form method="post">
        <Flex>
          <Input name="title" placeholder="タスクを入力" />
          <Button type="submit" name="action" value="create">
            作成
          </Button>
        </Flex>
      </fetcher.Form>
      <List
        spacing="xs"
        size="sm"
        my={20}
        center
        icon={
          <ThemeIcon color="teal" size={24} radius="xl">
            <IconCircleCheck style={{ width: rem(16), height: rem(16) }} />
          </ThemeIcon>
        }
      >
        {tasks.map((task) => {
          return (
            <List.Item key={task.id}>
              <Flex>
                <Text w={100} mr={15}>
                  {task.title}
                </Text>
                <UnstyledButton
                  onClick={() => {
                    handleOpenModal(task);
                  }}
                >
                  <IconPencil />
                </UnstyledButton>
                <fetcher.Form method="delete">
                  <Input type="hidden" name="id" value={task.id} />
                  <UnstyledButton type="submit" name="action" value="delete">
                    <IconBucket />
                  </UnstyledButton>
                </fetcher.Form>
              </Flex>
            </List.Item>
          );
        })}
      </List>

      <EditModal
        task={selectedTask}
        isShow={isShowModal}
        close={handleCloseModal}
      />
    </div>
  );
}

export const clientLoader = async () => {
  try {
    await getCsrfToken();
    const tasks = await getAllTasks();
    return json({ tasks });
  } catch (err) {
    throw new Error((err as AxiosError).message);
  }
};

export const clientAction = async ({ request }: ClientActionFunctionArgs) => {
  const formData = await request.formData();
  const title = formData.get("title");
  const id = formData.get("id");
  switch (formData.get("action")) {
    case "create":
      if (!title) return null;
      try {
        await createTask(title.toString());
        return null;
      } catch (err) {
        throw new Error((err as AxiosError).message);
      }
    case "update":
      if (!title) return null;
      try {
        await updateTask(Number(id), title.toString());
        return null;
      } catch (err) {
        throw new Error((err as AxiosError).message);
      }
    case "delete":
      try {
        await deleteTask(Number(id));
        return null;
      } catch (err) {
        throw new Error((err as AxiosError).message);
      }
  }
};
