import React, { useState } from "react";

import { Button, Input, Modal, Typography } from "@bigbinary/neetoui";
import { useCreateCategory } from "hooks/reactQuery/useCategoriesApi";

const New = ({ isModalOpen, toggleModal }) => {
  const [category, setCategory] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const createCategoryMutation = useCreateCategory({
    onSuccess: () => {
      setCategory("");
      toggleModal();
    },
    onError: error => {
      const message =
        error.response?.data?.error ||
        "An error occurred while creating the category. Please try again.";
      setErrorMessage(message);
    },
  });

  const handleSubmit = () => {
    if (!category.trim()) {
      setErrorMessage("Category title cannot be empty.");

      return;
    }

    setErrorMessage("");
    createCategoryMutation.mutate({ name: category });
  };

  return (
    <Modal isOpen={isModalOpen} size="medium" onClose={toggleModal}>
      <Modal.Header>
        <Typography style="h2">New category</Typography>
      </Modal.Header>
      <Modal.Body>
        <Input
          error={!!errorMessage}
          label="Category name"
          placeholder="Enter category"
          value={category}
          onChange={e => setCategory(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer className="flex items-center justify-end gap-2">
        <Button
          label="Cancel"
          style="secondary"
          type="reset"
          onClick={toggleModal}
        />
        <Button label="Submit" type="submit" onClick={handleSubmit} />
      </Modal.Footer>
    </Modal>
  );
};

export default New;
