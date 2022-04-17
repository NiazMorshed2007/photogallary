import { Button, Modal } from "antd";
import React, { FC, useState } from "react";
import { IPhoto } from "../interfaces/IPhoto";
import { BsArrowsAngleExpand } from "react-icons/bs";
import { AiOutlineHeart, AiOutlineDelete } from "react-icons/ai";
import { IAlbum } from "../interfaces/IAlbum";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import { setAlbums } from "../actions";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase/firebase";
import { IProfile } from "../interfaces/IProfile";
import { deleteObject, ref } from "firebase/storage";

interface Props {
  photo: IPhoto;
  album: IAlbum;
}

const Photo: FC<Props> = (props) => {
  const { photo, album } = props;
  const [visible, setVisible] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const user_albums: IAlbum[] = useSelector((state: RootState) => {
    return state.user_albums;
  });
  const user_profile: IProfile = useSelector((state: RootState) => {
    return state.user_profile;
  });
  const dispatch = useDispatch();
  const [selectedPhotoId, setSelectedPhotoId] = useState<string>("");
  const [selectedPhotoURL, setSelectedPhotoURL] = useState<string>("");
  const showDeleteModal = (): void => {
    setVisible(true);
  };
  const hideModal = (): void => {
    setVisible(false);
  };
  const deletePhoto = (): void => {
    if (selectedPhotoId !== "") {
      const docRef = doc(db, "users", user_profile.uid);
      const del_imgRef = ref(storage, selectedPhotoURL);
      const del_index = album.photos
        .map((photo) => photo.photo__id)
        .indexOf(selectedPhotoId);
      album.photos.splice(del_index, 1);
      dispatch(setAlbums([...user_albums]));
      deleteObject(del_imgRef)
        .then(() => {
          updateDoc(docRef, {
            albums: user_albums,
          });
          hideModal();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <>
      <div className="photo pointer">
        <div className="img-placeholder"></div>
        <div className="img-wrapper position-relative">
          <i className="expand-icon">
            <BsArrowsAngleExpand />
          </i>
          <i className="heart-icon">
            <AiOutlineHeart />
          </i>
          <i
            onClick={() => {
              showDeleteModal();
              setSelectedPhotoId(photo.photo__id);
              setSelectedPhotoURL(photo.photo__url);
            }}
            className="delete-icon"
          >
            <AiOutlineDelete />
          </i>
          <img src={photo.photo__url} alt="" />
        </div>
      </div>
      <Modal
        className="my-modal"
        onCancel={() => {
          hideModal();
          setChecked(false);
        }}
        onOk={() => {
          hideModal();
          setChecked(false);
        }}
        footer={false}
        visible={visible}
        closeIcon={<></>}
        mask={false}
      >
        <div className="my-modal delete-modal shadow">
          <h4 className="mb-2">Delete this Photo</h4>
          <p className="m-0">
            You are about to <strong>permanently delete</strong> this photo
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
                onClick={deletePhoto}
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

export default Photo;
