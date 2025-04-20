import React, { useState } from "react";

import { Container, Header } from "components/commons";
import { useFetchCategories } from "hooks/reactQuery/useCategoriesApi";
import { useCreatePost } from "hooks/reactQuery/usePostsApi";
import Logger from "js-logger";

import Form from "./Form";

import routes from "~/routes";

const Create = ({ history }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const { data } = useFetchCategories();
  const categories = data?.data?.categories || [];

  const { mutate, isLoading } = useCreatePost({
    onSuccess: () => {
      history.push(routes.root);
    },
    onError: error => {
      Logger.error(error);
    },
  });

  const handleCancel = () => {
    history.push(routes.root);
  };

  const handleSubmit = event => {
    event.preventDefault();
    mutate({
      title,
      description,
      category_ids: selectedCategories,
    });
  };

  return (
    <Container>
      <div className="mx-auto w-full max-w-7xl flex-1 space-y-6 overflow-y-auto px-[5vw] pt-[3vw]">
        <Header pageTitle="Add new post" />
        <div className="rounded-3xl border p-[3vw] shadow-lg">
          <Form
            categories={categories}
            description={description}
            handleCancel={handleCancel}
            handleSubmit={handleSubmit}
            loading={isLoading}
            setDescription={setDescription}
            setSelectedCategories={setSelectedCategories}
            setTitle={setTitle}
            title={title}
          />
        </div>
      </div>
    </Container>
  );
};

export default Create;
