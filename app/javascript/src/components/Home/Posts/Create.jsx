import React, { useState } from "react";

import postsApi from "apis/posts";
import { Container, PageTitle } from "components/commons";

import Form from "./Form";

import routes from "~/routes";

const Create = ({ history }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      await postsApi.create({ title, description });
      setLoading(false);
      history.push(routes.root);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="flex flex-col gap-y-8">
        <PageTitle title="Add new post" />
        <Form
          description={description}
          handleSubmit={handleSubmit}
          loading={loading}
          setDescription={setDescription}
          setTitle={setTitle}
          title={title}
        />
      </div>
    </Container>
  );
};

export default Create;
