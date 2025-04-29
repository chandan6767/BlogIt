import React, { useEffect, useState } from "react";

import { Container, Header } from "components/commons";
import { useFetchCategories } from "hooks/reactQuery/useCategoriesApi";
import { useShowPost, useUpdatePost } from "hooks/reactQuery/usePostsApi";
import Logger from "js-logger";
import { useParams } from "react-router-dom";

import Form from "./Form";

import routes from "~/routes";

// TODO implement Pundit
const Edit = ({ history }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const { slug } = useParams();

  const { data: postData, isLoading: isPostLoading } = useShowPost(slug);
  const { data: categoryData } = useFetchCategories();
  const categories = categoryData?.data?.categories || [];

  const { mutate, isLoading: isUpdating } = useUpdatePost({
    onSuccess: () => {
      history.replace(routes.posts.show.replace(":slug", slug));
    },
    onError: error => {
      Logger.error(error);
    },
  });

  useEffect(() => {
    if (postData?.data?.post) {
      const post = postData.data.post;
      setTitle(post.title);
      setDescription(post.description);
      setSelectedCategories(post.categories);
    }
  }, [postData]);

  const handleCancel = () => {
    history.replace(routes.posts.show.replace(":slug", slug));
  };

  const handleSubmit = event => {
    event.preventDefault();
    mutate({
      payload: {
        title,
        description,
        category_ids: selectedCategories.map(category => category.id),
      },
      slug,
    });
  };

  return (
    <Container>
      <div className="mx-auto w-full max-w-7xl flex-1 space-y-6 overflow-y-auto px-[5vw] pt-[3vw]">
        <Header pageTitle="Edit post" />
        <div className="rounded-3xl border p-[3vw] shadow-lg">
          <Form
            categories={categories}
            description={description}
            handleCancel={handleCancel}
            handleSubmit={handleSubmit}
            loading={isPostLoading || isUpdating}
            selectedCategories={selectedCategories}
            setDescription={setDescription}
            setSelectedCategories={setSelectedCategories}
            setTitle={setTitle}
            title={title}
            type="update"
          />
        </div>
      </div>
    </Container>
  );
};

export default Edit;
