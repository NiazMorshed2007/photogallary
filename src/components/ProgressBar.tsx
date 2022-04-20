import React, { FC } from "react";

interface Props {
  progress: number;
}

const ProgressBar: FC<Props> = (props) => {
  const { progress } = props;
  return (
    <div className="progress-bar-parent">
      <span>Uploading image....({Math.floor(progress)}% / 100%)</span>
      <div className="progress-bar-wrapper">
        <div className="juice" style={{ width: progress + "%" }}></div>
      </div>
    </div>
  );
};
export default ProgressBar;
