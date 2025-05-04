import React, { useEffect, useState } from "react";

import { Modal, Typography } from "@bigbinary/neetoui";
import postsApi from "apis/posts";
import createConsumer from "channels/consumer";
import { subscribeToPdfDownloadChannel } from "channels/pdfDownloadChannel";
import { ProgressBar } from "components/commons";
import FileSaver from "file-saver";
import Logger from "js-logger";
import { useParams } from "react-router-dom";

const DownloadPdf = ({ setIsModalOpen, description }) => {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  const { slug } = useParams();

  const consumer = createConsumer();

  const generatePdf = async () => {
    try {
      await postsApi.generatePdf(slug);
    } catch (error) {
      Logger.error(error);
    }
  };

  const downloadPdf = async () => {
    try {
      const { data, headers } = await postsApi.download(slug);
      const disposition = headers["content-disposition"];
      let filename = "granite_task_report.pdf";

      if (disposition && disposition.includes("filename=")) {
        const matches = disposition.match(/filename="?([^"]+)"?/);
        if (matches?.[1]) filename = matches[1];
      }

      FileSaver.saveAs(data, filename);
      setIsModalOpen(false);
    } catch (error) {
      Logger.error(error);
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
    consumer.disconnect();
  };

  useEffect(() => {
    subscribeToPdfDownloadChannel({
      consumer,
      setMessage,
      setProgress,
      generatePdf,
    });

    return () => {
      consumer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setMessage("Saving PDF");
      downloadPdf();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);

  return (
    <Modal isOpen onClose={handleClose}>
      <Modal.Header description={description}>
        <Typography id="dialog1Title" style="h2">
          {message}
        </Typography>
      </Modal.Header>
      <Modal.Body>
        <ProgressBar progress={progress} />
      </Modal.Body>
    </Modal>
  );
};

export default DownloadPdf;
