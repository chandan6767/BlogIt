import React, { useEffect, useState } from "react";

import postsApi from "apis/posts";
import { Container, PageTitle } from "components/commons";
import Logger from "js-logger";
import { useParams } from "react-router-dom";

const Download = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { slug } = useParams();

  const generatePdf = async () => {
    try {
      await postsApi.generatePdf(slug);
    } catch (error) {
      Logger.error(error);
    }
  };

  const saveAs = ({ blob, fileName }) => {
    const objectUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = objectUrl;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    setTimeout(() => window.URL.revokeObjectURL(objectUrl), 150);
  };

  const downloadPdf = async () => {
    try {
      const { data } = await postsApi.download(slug);
      saveAs({ blob: data, fileName: "blog_it_post.pdf" });
    } catch (error) {
      Logger.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    generatePdf();
    setTimeout(() => {
      downloadPdf();
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const message = isLoading ? "PDF is being generated..." : "PDF downloaded!";

  return (
    <Container>
      <div className="flex flex-col gap-y-8">
        <PageTitle title="Download PDF" />
        <h1>{message}</h1>
      </div>
    </Container>
  );
};

export default Download;
