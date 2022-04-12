import { Dropdown, Menu } from "antd";
import React, { FC } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import { IAlbum } from "../interfaces/IAlbum";

interface Props {
  album: IAlbum;
}

const Album: FC<Props> = (props) => {
  const { album } = props;
  return (
    <div className="album mb-5 shadow-sm pointer">
      <Link to={`/album/${album.id}`} state={{ album__id: album.id }}>
        <img src={album.thumb} alt="" />
        <div className="album__content">
          <h6>{album.title}</h6>
          <span>{album.date}</span>
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
