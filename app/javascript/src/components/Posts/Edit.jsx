import React, { useEffect, useState } from "react";

import { Delete, MenuHorizontal } from "@bigbinary/neeto-icons";
import { Button, Dropdown, Typography } from "@bigbinary/neetoui";
import { Container, Header } from "components/commons";
import { useFetchCategories } from "hooks/reactQuery/useCategoriesApi";
import { useShowPost, useUpdatePost } from "hooks/reactQuery/usePostsApi";
import Logger from "js-logger";
import { useParams } from "react-router-dom";

import ActionWithDropdown from "./ActionWithDropdown";
import { POST_STATUS } from "./constants";
import Form from "./Form";
import { formatDate } from "./utils";

import routes from "~/routes";

// TODO implement Pundit
const Edit = ({ history }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [status, setStatus] = useState(POST_STATUS.DRAFT);

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
      setStatus(post.status);
    }
  }, [postData]);

  const handleCancel = () => {
    history.replace(routes.posts.show.replace(":slug", slug));
  };

  const handleSubmit = () => {
    mutate({
      payload: {
        title,
        description,
        category_ids: selectedCategories.map(category => category.id),
        status,
      },
      slug,
    });
  };

  const lastPublished = formatDate(
    postData?.data?.post?.updated_at,
    "HH:mmA D MMMM YYYY"
  );

  const isPublished = postData?.data?.post?.status === "published";
  const isDisableSubmitAction =
    isPostLoading || isUpdating || !title.trim() || !description.trim();

  return (
    <Container>
      <div className="mx-auto w-full max-w-7xl flex-1 space-y-6 overflow-y-auto px-[5vw] pt-[3vw]">
        <Header
          pageTitle="Edit post"
          actionBlock={
            <>
              <Typography style="body3">
                {isPublished ? "Last published at " : "Draft saved at "}
                <span className="font-medium">{lastPublished}</span>
              </Typography>
              <Button label="Cancel" style="secondary" onClick={handleCancel} />
              <ActionWithDropdown
                isDisabled={isDisableSubmitAction}
                setStatus={setStatus}
                status={status}
                onSubmit={handleSubmit}
              />
              <Dropdown
                buttonStyle="text"
                buttonProps={{
                  icon: MenuHorizontal,
                }}
                tooltipProps={{
                  content: "More actions",
                  position: "top",
                }}
              >
                <Dropdown.Menu>
                  <Dropdown.MenuItem.Button
                    className="text-right"
                    prefix={<Delete size={16} />}
                    style="danger"
                  >
                    Delete
                  </Dropdown.MenuItem.Button>
                </Dropdown.Menu>
              </Dropdown>
            </>
          }
        />
        <div className="rounded-3xl border p-[3vw] shadow-lg">
          <Form
            categories={categories}
            description={description}
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
