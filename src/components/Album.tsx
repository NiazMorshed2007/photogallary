import { Dropdown, Menu } from "antd";
import React, { FC } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import { IAlbum } from "../interfaces/IAlbum";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

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
        <Dropdown
          placement="bottom"
          trigger={["click"]}
          overlay={
            <Menu>
              <Menu.Item icon={<MdOutlineFavoriteBorder />}>
                Add to favorites
              </Menu.Item>
              <Menu.Item icon={<FiEdit2 />}>Edit</Menu.Item>
              <Menu.Item icon={<AiOutlineDelete />}>Delete album</Menu.Item>
            </Menu>
          }
        >
          <i className="pointer text-white">
            <BsThreeDotsVertical />
          </i>
        </Dropdown>
      </Link>
    </div>
  );
};

export default Album;
