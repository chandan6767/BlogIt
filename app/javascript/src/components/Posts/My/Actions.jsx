import React from "react";

import { MenuHorizontal } from "@bigbinary/neeto-icons";
import { Dropdown } from "@bigbinary/neetoui";
import { POST_STATUS } from "components/Posts/constants";
import { useDeletePost, useUpdatePost } from "hooks/reactQuery/usePostsApi";
import Logger from "js-logger";

const Actions = ({ post }) => {
  const { mutate: updatePost } = useUpdatePost({
    onError: error => {
      Logger.error(error);
    },
  });

  const { mutate: deletePost } = useDeletePost({
    onError: error => {
      Logger.error(error);
    },
  });

  const updatePostStatus = (slug, status) => {
    updatePost({
      payload: {
        status,
      },
      slug,
    });
  };

  return (
    <Dropdown buttonStyle="text" icon={MenuHorizontal} strategy="fixed">
      <Dropdown.Menu>
        {post.status === "draft" ? (
          <>
            <Dropdown.MenuItem.Button
              onClick={() => updatePostStatus(post.slug, POST_STATUS.PUBLISHED)}
            >
              Publish
            </Dropdown.MenuItem.Button>
            <Dropdown.Divider />
            <Dropdown.MenuItem.Button
              style="danger"
              onClick={() => deletePost(post.slug)}
            >
              Delete
            </Dropdown.MenuItem.Button>
          </>
        ) : (
          <>
            <Dropdown.MenuItem.Button
              onClick={() => updatePostStatus(post.slug, POST_STATUS.DRAFT)}
            >
              Unpublish
            </Dropdown.MenuItem.Button>
            <Dropdown.Divider />
            <Dropdown.MenuItem.Button
              style="danger"
              onClick={() => deletePost(post.slug)}
            >
              Delete
            </Dropdown.MenuItem.Button>
          </>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Actions;
