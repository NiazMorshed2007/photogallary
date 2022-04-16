import { Modal } from "antd";
import gsap from "gsap";
import React, { FC, useEffect, useState } from "react";
import { IPhoto } from "../interfaces/IPhoto";

interface Props {
  photo: IPhoto;
}

const Photo: FC<Props> = (props) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const tl = gsap.timeline();
  }, []);
  const { photo } = props;
  return (
    <>
      <div className="photo">
        <div className="img-placeholder"></div>
        <div className="img-wrapper">
          <img src={photo.photo__url} alt="" />
        </div>
      </div>
      <Modal visible={visible}></Modal>
    </>
  );
};

export default Photo;
