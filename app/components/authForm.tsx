import { Form, Link } from "@remix-run/react";
import { useState } from "react";
import styles from "./authForm.module.css";
import {
  Box,
  Button,
  Container,
  Text,
  Input,
  PasswordInput,
  Center,
  Flex,
} from "@mantine/core";

type AuthType = "login" | "signup";

export default function AuthForm() {
  const [type, setType] = useState<AuthType>("login");
  const handleChangeType = () =>
    setType((type) => (type === "login" ? "signup" : "login"));

  return (
    <div>
      <Container maw={400} h={200} mt={100}>
        <Form method="post">
          <Text>email</Text>
          <Input placeholder="メールアドレス" mb={20} name="email" />
          <Text>パスワード</Text>
          <PasswordInput placeholder="パスワード" mb={20} name="password" />
          <Flex direction="column" justify="center" align="center" gap={10}>
            <Button type="submit" name="type" value={type}>
              {type}
            </Button>
            <Text td="underline" c="blue" onClick={handleChangeType}>
              {type === "login" ? "アカウントをお持ちでない方" : "ログイン"}
            </Text>
          </Flex>
        </Form>
      </Container>
    </div>
  );
}
