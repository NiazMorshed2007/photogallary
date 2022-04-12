import React, { FC } from "react";
import useStorage from "../hooks/useStorage";

interface Props {
  file: File;
}

const ProgressBar: FC<Props> = (props) => {
  const { file } = props;
  const { url, storageErr, progress } = useStorage(file);
  return (
    <>
      <div
        className="progress-bar"
        style={{ height: "3px", background: "orange", width: progress + "px" }}
      ></div>
      <p>{url}</p>
    </>
  );
};
export default ProgressBar;
