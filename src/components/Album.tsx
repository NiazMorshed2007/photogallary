import { Button, Dropdown, Menu, Typography } from "antd";
import Modal from "antd/lib/modal/Modal";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React, { FC, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { db, storage } from "../firebase/firebase";
import { IAlbum } from "../interfaces/IAlbum";
import { RootState } from "../reducers";

const { Paragraph } = Typography;

interface Props {
  album: IAlbum;
  isPreviewMode: boolean;
  onFav: () => void;
}

const Album: FC<Props> = (props) => {
  const { album, isPreviewMode, onFav } = props;
  const [visible, setVisible] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const user_profile = useSelector((state: RootState) => {
    return state.user_profile;
  });
  const deleteAlbum = (): void => {
    const docRef = doc(db, "users", user_profile.uid);
    const album_thumbRef = ref(storage, album.thumb);
    // const album_photosRef = ref(storage);
    deleteObject(album_thumbRef)
      .then(() => {
        setVisible(false);
      })
      .catch((err) => {
        console.log(err);
      });
    updateDoc(docRef, {
      albums: arrayRemove(album),
    });
  };
  return (
    <>
      <div className="album mb-3 shadow pointer">
        <div className="thumb-wrapper position-relative">
          <div className="position-absolute w-100 d-flex align-items-center justify-content-center h-100 top-0">
            <span>
              {isPreviewMode ? "Choose a img to preview" : "waiting..."}
            </span>
          </div>
          {!isPreviewMode ? (
            <Link to={`/album/${album.id}`} state={{ album__id: album.id }}>
              <img src={album.thumb} alt="" />
            </Link>
          ) : (
            <img src={album.thumb} alt="" />
          )}
        </div>
        <div className="album__content d-flex align-items-center justify-content-between">
          <div className="left">
            <h6 className="title">
              <Paragraph
                style={{ width: 200 + "px" }}
                className="m-0"
                ellipsis={true}
              >
                {album.title}
              </Paragraph>
            </h6>
            <span className="date">{album.date}</span>
          </div>
          <div className="right d-flex align-items-center gap-3">
            <i onClick={onFav}>
              <MdOutlineFavoriteBorder
                style={{ color: album.favorite ? "red" : "" }}
              />
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
                  onClick={() => setVisible(true)}
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
        className="my-modal"
        onCancel={() => {
          setVisible(false);
        }}
        onOk={() => setVisible(false)}
        footer={false}
        visible={visible}
        closeIcon={<></>}
        mask={false}
      >
        <div className="my-modal delete-modal shadow">
          <h4 className="mb-2">Delete this Album</h4>
          <p className="m-0">
            You are about to <strong>permanently delete</strong> the
            <span> album</span>
            <span
              onClick={() => setVisible(false)}
              className="primary-color pointer px-1"
            >
              {album.title}
            </span>
          </p>
          <form>
            <label className="d-flex gap-1 align-items-center pt-2">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => setChecked && setChecked(!checked)}
              />
              I am aware that I <strong>cannot undo</strong> this.
            </label>
            <hr />
            <p className="des">
              Once you delete the album all of your photos will be deleted.
            </p>

            <div className="btn-wrapper pt-3 d-flex align-items-center justify-content-end gap-2">
              <Button
                className="delete-btn"
                type="primary"
                disabled={!checked}
                danger={checked ? true : false}
                onClick={deleteAlbum}
              >
                Delete
              </Button>
              <Button onClick={() => setVisible(false)} className="default-btn">
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default Album;
