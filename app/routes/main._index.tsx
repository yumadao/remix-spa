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
import { type MetaFunction } from "@remix-run/node";
import {
  useLoaderData,
  ClientActionFunctionArgs,
  useFetcher,
} from "@remix-run/react";
import {
  IconCircleCheck,
  IconCircleDashed,
  IconBucket,
  IconPencil,
} from "@tabler/icons-react";
import { AxiosError } from "axios";
import { createTask, getAllTasks, getCsrfToken } from "~/utils/data";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix SPA" },
    { name: "description", content: "Welcome to Remix (SPA Mode)!" },
  ];
};

export default function About() {
  const { tasks } = useLoaderData<typeof clientLoader>();
  const fetcher = useFetcher();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <fetcher.Form method="post">
        <Flex>
          <Input name="title" placeholder="タスクを入力" />
          <Button type="submit">作成</Button>
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
            <List.Item>
              <Flex>
                <Text w={100} mr={15}>
                  {task.title}
                </Text>
                <IconPencil />
                <fetcher.Form method="delete" action="./delete">
                  <UnstyledButton type="submit" name="id" value={task.id}>
                    <IconBucket />
                  </UnstyledButton>
                </fetcher.Form>
              </Flex>
            </List.Item>
          );
        })}
      </List>
    </div>
  );
}

export const clientLoader = async () => {
  try {
    await getCsrfToken();
    const tasks = await getAllTasks();
    return { tasks };
  } catch (err) {
    throw new Error((err as AxiosError).message);
  }
};

export const clientAction = async ({ request }: ClientActionFunctionArgs) => {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  try {
    await createTask(title);
    return null;
  } catch (err) {
    throw new Error((err as AxiosError).message);
  }
};
