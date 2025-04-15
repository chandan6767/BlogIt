import React, { useEffect, useState } from "react";

import { Typography } from "@bigbinary/neetoui";
import postsApi from "apis/posts";
import { Container, PageLoader } from "components/commons";
import dayjs from "dayjs";
import { useHistory, useParams } from "react-router-dom";

const Show = () => {
  const [post, setPost] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const { slug } = useParams();
  const history = useHistory();

  const fetchPostDetails = async () => {
    try {
      const {
        data: { post },
      } = await postsApi.show(slug);
      setPost(post);
      setPageLoading(false);
    } catch (error) {
      logger.error(error);
      history.push("/");
    }
  };

  useEffect(() => {
    fetchPostDetails();
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  const createdAt = dayjs(post?.created_at).format("D MMMM YYYY");

  return (
    <Container>
      <div className="mx-auto w-[1280px] space-y-8 pt-[3vw]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Typography className="font-bold lg:text-3xl" style="h2">
            {post?.title}
          </Typography>
          <Typography className="italic" style="body2">
            {createdAt}
          </Typography>
        </div>
        <Typography className="lg:text-lg" style="body1">
          {post?.description}
        </Typography>
      </div>
    </Container>
  );
};

export default Show;
