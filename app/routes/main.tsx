import { Container, Group, Title, Button, Divider } from "@mantine/core";
import { Form, Outlet, redirect } from "@remix-run/react";
import { IconLogout } from "@tabler/icons-react";
import { logout } from "~/utils/data";

export default function MainLayout() {
  return (
    <Container size="lg">
      <Group
        align="center"
        justify="space-between"
        style={{ padding: "15px 0", border: "1px" }}
      >
        <div>
          <Title order={3}>Todo App</Title>
        </div>
        <Form method="post">
          <Button type="submit">
            <IconLogout />
          </Button>
        </Form>
      </Group>
      <Divider mb={30} />
      <Outlet />
    </Container>
  );
}

export const clientAction = async () => {
  await logout();
  return redirect("/auth");
};
