import React, { useState } from "react";

import SignupForm from "components/Authentication/Form/Signup";
import { PageLoader } from "components/commons";
import { useSignup } from "hooks/reactQuery/useAuthApi";
import { useFetchOrganizations } from "hooks/reactQuery/useOrganizationsApi";
import Logger from "js-logger";

import routes from "~/routes";

const Signup = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [selectedOrganizationId, setSelectedOrganizationId] = useState(null);

  const { data, isLoading: organizationsLoading } = useFetchOrganizations();
  const organizations = data?.data?.organizations || [];

  const { mutateAsync: signup, isLoading: signupLoading } = useSignup({
    onSuccess: () => {
      history.push(routes.root);
    },
    onError: error => {
      Logger.error(error);
    },
  });

  const handleSubmit = async event => {
    event.preventDefault();
    await signup({
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
      organization_id: selectedOrganizationId,
    });
  };

  if (organizationsLoading) {
    return <PageLoader />;
  }

  return (
    <SignupForm
      handleSubmit={handleSubmit}
      loading={signupLoading}
      organizations={organizations}
      setEmail={setEmail}
      setName={setName}
      setPassword={setPassword}
      setPasswordConfirmation={setPasswordConfirmation}
      setSelectedOrganizationId={setSelectedOrganizationId}
    />
  );
};

export default Signup;
