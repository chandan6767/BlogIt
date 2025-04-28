import React, { useState } from "react";

import { setAuthHeaders } from "apis/axios";
import LoginForm from "components/Authentication/Form/Login";
import { useLogin } from "hooks/reactQuery/useAuthApi";
import Logger from "js-logger";
import { setToLocalStorage } from "utils/storage";

import routes from "~/routes";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutateAsync: login, isLoading: loginLoading } = useLogin({
    onSuccess: ({ data }) => {
      setToLocalStorage({
        authToken: data.authentication_token,
        email: email.toLowerCase(),
        userId: data.id,
        userName: data.name,
      });
      setAuthHeaders();
      window.location.href = routes.root;
    },
    onError: error => {
      Logger.error(error);
    },
  });

  const handleSubmit = async event => {
    event.preventDefault();
    await login({ email, password });
  };

  return (
    <LoginForm
      handleSubmit={handleSubmit}
      loading={loginLoading}
      setEmail={setEmail}
      setPassword={setPassword}
    />
  );
};

export default Login;
