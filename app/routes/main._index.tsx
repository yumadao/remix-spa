import { Button, Flex, Input, List, ThemeIcon, rem, Text } from "@mantine/core";
import { type MetaFunction } from "@remix-run/node";
import {
  Form,
  useLoaderData,
  ClientActionFunctionArgs,
} from "@remix-run/react";
import {
  IconCircleCheck,
  IconCircleDashed,
  IconBucket,
  IconPencil,
} from "@tabler/icons-react";
import { AxiosError } from "axios";
import { useState } from "react";
import { createTask, getAllTasks, getCsrfToken } from "~/utils/data";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix SPA" },
    { name: "description", content: "Welcome to Remix (SPA Mode)!" },
  ];
};

export default function About() {
  const { tasks } = useLoaderData<typeof clientLoader>();
  const [isDone, setIsDone] = useState();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <Form method="post">
        <Flex>
          <Input name="title" placeholder="タスクを入力" />
          <Button type="submit">作成</Button>
        </Flex>
      </Form>
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
                <IconBucket />
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
    console.log(err as AxiosError);
    throw new Error((err as AxiosError).message);
  }
};

export const clientAction = async ({
  request,
  ...args
}: ClientActionFunctionArgs) => {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  request.headers.forEach((header) => {
    console.log({ header, ctx: args.context });
  });
  console.log({ title });
  return await createTask(title);
};
