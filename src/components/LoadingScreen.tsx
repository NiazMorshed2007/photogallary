import React, { FC } from "react";

interface Props {
  loading: boolean;
}

const LoadingScreen: FC<Props> = (props) => {
  const { loading } = props;
  return (
    <div
      style={{ display: loading ? "flex" : "none" }}
      className="vw-100 vh-100 d-flex align-items-center justify-content-center position-fixed loading-screen"
    >
      <div className="loader"></div>
    </div>
  );
};

export default LoadingScreen;
