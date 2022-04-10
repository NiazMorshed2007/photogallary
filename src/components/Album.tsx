import { Dropdown, Menu } from "antd";
import React, { FC } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";

interface Props {
  img__src: string;
  title: string;
  date: string;
  id: string;
}

const Album: FC<Props> = (props) => {
  const { img__src, title, date, id } = props;
  return (
    <div className="album mb-5 shadow-sm pointer">
      <Link to={`/album/${id}`} state={{ album__id: id }}>
        <img src={img__src} alt="" />
        <div className="album__content">
          <h6>{title}</h6>
          <span>{date}</span>
        </div>
        <Dropdown overlay={<Menu></Menu>}>
          <i className="pointer">
            <BsThreeDotsVertical />
          </i>
        </Dropdown>
      </Link>
    </div>
  );
};

export default Album;
