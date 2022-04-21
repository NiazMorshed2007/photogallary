import { Button } from "antd";
import React, { FC } from "react";
import emptyImg from "../assets/empty1.svg";

interface Props {
  message: string;
  runFunc: () => void;
}

const Empty: FC<Props> = (props) => {
  const { message, runFunc } = props;
  return (
    <div className="empty mt-4 d-flex align-items-center justify-content-center w-100 h-100 flex-column">
      <img className="empty-image" src={emptyImg} alt="" />
      <h3>{message}</h3>
      <Button onClick={runFunc} className="primary-btn-fill mt-4 mb-5">
        Create
      </Button>
    </div>
  );
};

export default Empty;
