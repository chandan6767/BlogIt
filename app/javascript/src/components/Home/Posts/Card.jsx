import React from "react";

import dayjs from "dayjs";

const Card = ({ title, description, created_at }) => {
  const formattedDate = dayjs(created_at).format("D MMMM YYYY");

  return (
    <div className="space-y-1 border-b py-3">
      <h1 className="text-lg font-semibold">{title}</h1>
      <p className="text-sm">{description}</p>
      <p className="text-xs text-bb-gray-600">{formattedDate}</p>
    </div>
  );
};

export default Card;
