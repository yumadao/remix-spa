import { Modal, Input, Button, Flex, Text } from "@mantine/core";
import { useFetcher } from "@remix-run/react";
import { Task } from "~/utils/types";
import { format } from "date-fns";

type Props = {
  task: Task | undefined;
  isShow: boolean;
  close: VoidFunction;
};

export default function EditModal({ task, isShow, close }: Props) {
  const fetcher = useFetcher();
  const getFormattedDateText = (dateText: string): string => {
    return format(dateText, "yyyy/MM/dd");
  };
  if (!task) return <></>;
  return (
    <Modal opened={isShow} onClose={close} withCloseButton={false} centered>
      <fetcher.Form method="put" onSubmit={close}>
        <Flex justify="center" my={30}>
          <Input
            name="title"
            placeholder="タスクを入力"
            defaultValue={task.title}
            w={300}
          />
          <Input type="hidden" name="id" value={task.id} />
          <Button type="submit" name="action" value="update">
            更新
          </Button>
        </Flex>
        <Flex justify="space-around">
          <Text>作成日: {getFormattedDateText(task.created_at)}</Text>
          <Text>更新日: {getFormattedDateText(task.updated_at)}</Text>
        </Flex>
      </fetcher.Form>
    </Modal>
  );
}
