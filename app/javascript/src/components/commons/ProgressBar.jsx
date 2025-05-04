import React from "react";

import { motion } from "framer-motion";

const ProgressBar = ({ progress }) => {
  const showLabelInside = progress > 12;

  return (
    <div className="relative h-3 w-full rounded-full bg-gray-100 shadow-inner dark:bg-gray-800">
      <motion.div
        animate={{ width: `${progress}%` }}
        className="absolute left-0 top-0 h-full rounded-full bg-green-500"
        initial={{ width: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {showLabelInside && (
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-white">
            {progress}%
          </span>
        )}
      </motion.div>
      {!showLabelInside && (
        <span className="absolute left-1 top-1/2 z-10 -translate-y-1/2 text-[10px] font-semibold text-green-700">
          {progress}%
        </span>
      )}
    </div>
  );
};

export default ProgressBar;
