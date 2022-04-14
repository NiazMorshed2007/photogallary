import { Dropdown, Menu } from "antd";
import React, { FC, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import { IAlbum } from "../interfaces/IAlbum";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import Modal from "antd/lib/modal/Modal";

interface Props {
  album: IAlbum;
  isPreviewMode: boolean;
}

const Album: FC<Props> = (props) => {
  const { album, isPreviewMode } = props;
  const [isVisible, setIsVisible] = useState<boolean>(false);
  return (
    <>
      <div className="album mb-5 shadow-sm pointer">
        <Link to={`/album/${album.id}`} state={{ album__id: album.id }}>
          <img src={album.thumb} alt="" />
        </Link>

        <div className="album__content">
          <h6>{album.title}</h6>
          <span>{album.date}</span>
        </div>
        {!isPreviewMode && (
          <Dropdown
            placement="bottom"
            trigger={["click"]}
            overlay={
              <Menu>
                <Menu.Item icon={<MdOutlineFavoriteBorder />}>
                  Add to favorites
                </Menu.Item>
                <Menu.Item icon={<FiEdit2 />}>Edit</Menu.Item>
                <Menu.Item
                  onClick={() => setIsVisible(true)}
                  icon={<AiOutlineDelete />}
                >
                  Delete album
                </Menu.Item>
              </Menu>
            }
          >
            <i className="pointer text-white">
              <BsThreeDotsVertical />
            </i>
          </Dropdown>
        )}
      </div>
      <Modal
        onCancel={() => {
          setIsVisible(false);
        }}
        onOk={() => {
          setIsVisible(false);
        }}
        visible={isVisible}
      >
        <h3>Are you sure you want to delete the album {}</h3>
      </Modal>
    </>
  );
};

export default Album;
