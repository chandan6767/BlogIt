import React, { useEffect, useState } from "react";

import { Button } from "@bigbinary/neetoui";
import tasksApi from "apis/posts";
import { Container, PageLoader } from "components/commons";
import List from "components/Posts/List";
import { either, isEmpty, isNil } from "ramda";
import { useHistory } from "react-router-dom";

import Header from "./commons/Header";

import routes from "~/routes";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const history = useHistory();

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

  const navigateToCreatePost = () => {
    history.push(routes.posts.create);
  };

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
    <Container>
      <Header
        pageTitle="Blog posts"
        actionBlock={
          <Button
            label="Add new blog post"
            size="large"
            onClick={navigateToCreatePost}
          />
        }
      />
      <div className="flex-1 overflow-y-auto p-[5vw] pt-0">
        <List posts={posts} />
      </div>
    </Container>
  );
};

export default Home;
