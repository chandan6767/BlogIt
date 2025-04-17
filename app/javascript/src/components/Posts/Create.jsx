import React, { useState } from "react";

import postsApi from "apis/posts";
import { Container, Header } from "components/commons";

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

  const handleCancel = () => {
    history.push(routes.root);
  };

  return (
    <Container>
      <Header pageTitle="Add new post" />
      <div className="flex-1 overflow-y-auto p-10">
        <div className="rounded-3xl border p-[3vw] shadow-lg">
          <Form
            description={description}
            handleCancel={handleCancel}
            handleSubmit={handleSubmit}
            loading={loading}
            setDescription={setDescription}
            setTitle={setTitle}
            title={title}
          />
        </div>
      </div>
    </Container>
  );
};

export default Create;
