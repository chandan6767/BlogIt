import React from "react";

import { Check } from "@bigbinary/neeto-icons";
import { ActionDropdown } from "@bigbinary/neetoui";

import { POST_STATUS } from "./constants";

const ActionWithDropdown = ({ status, setStatus, onSubmit, isDisabled }) => {
  const isPublished = status === POST_STATUS.PUBLISHED;
  const label = isPublished ? "Publish" : "Save as draft";

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <ActionDropdown
      label={label}
      buttonProps={{
        disabled: isDisabled,
      }}
      onClick={handleSubmit}
    >
      <ActionDropdown.Menu>
        <ActionDropdown.MenuItem.Button
          prefix={isPublished && <Check />}
          onClick={() => setStatus("published")}
        >
          Publish
        </ActionDropdown.MenuItem.Button>
        <ActionDropdown.MenuItem.Button
          prefix={!isPublished && <Check />}
          onClick={() => setStatus("draft")}
        >
          Save as draft
        </ActionDropdown.MenuItem.Button>
      </ActionDropdown.Menu>
    </ActionDropdown>
  );
};

export default ActionWithDropdown;
