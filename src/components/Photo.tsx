import { Button, Modal } from "antd";
import { doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import * as _ from "lodash";
import React, { FC, useState } from "react";
import { AiOutlineDelete, AiOutlineHeart } from "react-icons/ai";
import { BsArrowsAngleExpand } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setAlbums } from "../actions";
import { db, storage } from "../firebase/firebase";
import { IAlbum } from "../interfaces/IAlbum";
import { IPhoto } from "../interfaces/IPhoto";
import { IProfile } from "../interfaces/IProfile";
import { RootState } from "../reducers";

interface Props {
  photo: IPhoto | null;
  album: IAlbum;
  onFuction: () => void;
  previewMode: boolean;
  preview_url?: string;
  onFav: () => void;
}

const Photo: FC<Props> = (props) => {
  const { photo, album, onFuction, onFav, previewMode, preview_url } = props;
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
      const del_index: number =
        album &&
        album.photos &&
        _.findIndex(album.photos, (photo) => {
          return photo.photo__id === selectedPhotoId;
        });
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

  const alert = (): void => {
    window.alert("Please, upload image first");
  };

  return (
    <>
      <div className="photo position-relative d-flex align-items-center justify-content-center pointer shadow">
        <div className="img-placeholder d-flex align-items-center justify-content-center">
          {previewMode ? "Select a image to preview" : ""}
        </div>
        <div className="img-wrapper position-relative">
          {previewMode ? (
            <i onClick={alert} className="expand-icon">
              <BsArrowsAngleExpand />
            </i>
          ) : (
            <i onClick={onFuction} className="expand-icon">
              <BsArrowsAngleExpand />
            </i>
          )}
          <i onClick={onFav} className="heart-icon">
            <AiOutlineHeart style={{ color: photo?.favorite ? "red" : "" }} />
          </i>
          <i
            onClick={() => {
              if (!previewMode) {
                showDeleteModal();
                setSelectedPhotoId(photo?.photo__id!);
                setSelectedPhotoURL(photo?.photo__url!);
              } else {
                alert();
              }
            }}
            className="delete-icon"
          >
            <AiOutlineDelete />
          </i>
          <img src={previewMode ? preview_url : photo?.photo__url!} alt="" />
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
              Once you delete this is image you can't get it back.
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
