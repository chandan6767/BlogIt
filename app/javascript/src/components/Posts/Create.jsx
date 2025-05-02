import React, { useEffect, useState } from "react";

import { ExternalLink } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui";
import { Container, Header } from "components/commons";
import { useFetchCategories } from "hooks/reactQuery/useCategoriesApi";
import { useCreatePost } from "hooks/reactQuery/usePostsApi";
import useLocalStorage from "hooks/useLocalStorage";
import Logger from "js-logger";
import { isEmpty, isNil } from "ramda";

import ActionWithDropdown from "./ActionWithDropdown";
import { POST_CREATE_PREVIEW_DATA_KEY, POST_STATUS } from "./constants";
import Form from "./Form";

import routes from "~/routes";

const Create = ({ history }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [status, setStatus] = useState(POST_STATUS.DRAFT);

  const [previewData, setPreviewData, clearPreviewData] = useLocalStorage(
    POST_CREATE_PREVIEW_DATA_KEY,
    {},
    60 * 60 * 1000
  );

  const { data, isLoading: isCategoriesLoading } = useFetchCategories();
  const categories = data?.data?.categories || [];

  const { mutate, isLoading } = useCreatePost({
    onSuccess: () => {
      clearPreviewData();
      history.replace(routes.root);
    },
    onError: error => {
      Logger.error(error);
    },
  });

  const handleCancel = () => {
    history.replace(routes.root);
  };

  const handleSubmit = () => {
    mutate({
      title,
      description,
      category_ids: selectedCategories.map(category => category.id),
      status,
    });
  };

  const handlePreview = () => {
    history.push(routes.posts.preview);
  };

  useEffect(() => {
    const hasPreviewData = !isEmpty(previewData) && !isNil(previewData);

    if (hasPreviewData) {
      setTitle(previewData.title || "");
      setDescription(previewData.description || "");
      setSelectedCategories(previewData.categories || []);
      clearPreviewData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setPreviewData({
      title,
      description,
      categories: selectedCategories,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, selectedCategories]);

  return (
    <Container>
      <div className="mx-auto w-full max-w-7xl flex-1 space-y-6 overflow-y-auto px-[5vw] pt-[3vw]">
        <Header
          pageTitle="Add new post"
          actionBlock={
            <>
              <Button
                icon={ExternalLink}
                style="text"
                tooltipProps={{
                  content: "Preview",
                  position: "top",
                }}
                onClick={handlePreview}
              />
              <Button label="Cancel" style="secondary" onClick={handleCancel} />
              <ActionWithDropdown
                isDisabled={isLoading || !title.trim() || !description.trim()}
                setStatus={setStatus}
                status={status}
                onSubmit={handleSubmit}
              />
            </>
          }
        />
        <div className="rounded-3xl border p-[3vw] shadow-lg">
          <Form
            categories={categories}
            description={description}
            isCategoriesLoading={isCategoriesLoading}
            selectedCategories={selectedCategories}
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
