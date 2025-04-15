import React from "react";

import { Button, Input, Textarea } from "@bigbinary/neetoui";

const Form = ({
  type = "create",
  title,
  description,
  setTitle,
  setDescription,
  loading,
  handleSubmit,
}) => (
  <form className="space-y-4" onSubmit={handleSubmit}>
    <Input
      label="Title"
      placeholder="Post title (Max 125 Characters Allowed)"
      value={title}
      onChange={e => setTitle(e.target.value.slice(0, 125))}
    />
    <Textarea
      label="Description"
      placeholder="Post description (Max 10000 Characters Allowed)"
      value={description}
      onChange={e => setDescription(e.target.value)}
    />
    <Button
      label={type === "create" ? "Create Post" : "Update Post"}
      loading={loading}
      type="submit"
    />
  </form>
);

export default Form;
