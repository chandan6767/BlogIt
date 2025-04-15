import React, { useEffect, useState } from "react";

import tasksApi from "apis/posts";
import { Container, PageLoader, PageTitle } from "components/commons";
import { either, isEmpty, isNil } from "ramda";

import List from "./Post/List";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const {
        data: { posts },
      } = await tasksApi.fetch();
      setPosts(posts);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  if (either(isNil, isEmpty)(posts)) {
    return (
      <Container>
        <h1 className="my-5 text-center text-xl leading-5">
          You have not created or been assigned any tasks 🥳
        </h1>
      </Container>
    );
  }

  return (
    <Container className="flex flex-col space-y-4 px-10 py-6">
      <PageTitle title="Blog posts" />
      <List posts={posts} />
    </Container>
  );
};

export default Home;
