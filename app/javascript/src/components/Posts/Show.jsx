import React, { useEffect, useState } from "react";

import { Calendar } from "@bigbinary/neeto-icons";
import { Typography } from "@bigbinary/neetoui";
import postsApi from "apis/posts";
import { Container, PageLoader } from "components/commons";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";

const Show = ({ history }) => {
  const [post, setPost] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const { slug } = useParams();

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
      <div className="mx-auto w-full max-w-[1280px] space-y-4 py-[3vw]">
        <div className="space-y-4 border-b border-dashed pb-4">
          <Typography className="font-libre-baskerville font-bold" style="h1">
            {post?.title}
          </Typography>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 font-roboto text-bb-gray-600">
              <Calendar className="size-5" />
              <Typography style="body2">{createdAt}</Typography>
            </div>
          </div>
        </div>
        <Typography
          className="whitespace-pre-wrap font-roboto first-letter:font-libre-baskerville first-letter:text-2xl first-letter:font-bold lg:text-lg"
          style="body1"
        >
          {post?.description}
        </Typography>
      </div>
    </Container>
  );
};

export default Show;
