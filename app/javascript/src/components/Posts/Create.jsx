import React, { useState } from "react";

import postsApi from "apis/posts";
import { Container, Header } from "components/commons";
import { useFetchCategories } from "hooks/reactQuery/useCategoriesApi";
import Logger from "js-logger";

import Form from "./Form";

import routes from "~/routes";

const Create = ({ history }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const { data } = useFetchCategories();
  const categories = data?.data?.categories || [];

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      await postsApi.create({
        title,
        description,
        category_ids: selectedCategories,
      });
      setLoading(false);
      history.push(routes.root);
    } catch (error) {
      Logger.error(error);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    history.push(routes.root);
  };

  return (
    <Container>
      <Header pageTitle="Add new post" />
      <div className="flex-1 overflow-y-auto px-[5vw] pt-4">
        <div className="rounded-3xl border p-[3vw] shadow-lg">
          <Form
            categories={categories}
            description={description}
            handleCancel={handleCancel}
            handleSubmit={handleSubmit}
            loading={loading}
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
