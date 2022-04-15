import { Dropdown, Menu } from "antd";
import React, { FC, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import { IAlbum } from "../interfaces/IAlbum";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import Modal from "antd/lib/modal/Modal";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";

interface Props {
  album: IAlbum;
  isPreviewMode: boolean;
}

const Album: FC<Props> = (props) => {
  const { album, isPreviewMode } = props;
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const user_profile = useSelector((state: RootState) => {
    return state.user_profile;
  });
  const deleteAlbum = async (): Promise<void> => {
    const docRef = doc(db, "users", user_profile.uid);
    await updateDoc(docRef, {
      albums: arrayRemove(album),
    });
  };
  return (
    <>
      <div className="album mb-5 shadow pointer">
        <Link to={`/album/${album.id}`} state={{ album__id: album.id }}>
          <img src={album.thumb} alt="" />
        </Link>
        <div className="album__content d-flex align-items-center justify-content-between">
          <div className="left">
            <h6 className="title">{album.title}</h6>
            <span className="date">{album.date}</span>
          </div>
          <div className="right d-flex align-items-center gap-3">
            <i>
              <MdOutlineFavoriteBorder />
            </i>
            <i>
              <FiEdit2 />
            </i>
          </div>
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
            <i className="pointer menu-option text-white">
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
          deleteAlbum();
        }}
        visible={isVisible}
      >
        <h3>
          Are you sure you want to delete the album {album && album.title}?
        </h3>
      </Modal>
    </>
  );
};

export default Album;
