import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as _ from "lodash";
import { IAlbum } from "../interfaces/IAlbum";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import Header from "../components/Header";
import { Button } from "antd";
import Empty from "../assets/empty1.svg";
import Modal from "antd/lib/modal/Modal";
import { storage, db } from "../firebase/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { IProfile } from "../interfaces/IProfile";

const PageAlbum: FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const types: String[] = ["image/png", "image/jpg", "image/jpeg", "image/gif"];
  const [file, setFile] = useState<any>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [url, setUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  const user_profile: IProfile = useSelector((state: RootState) => {
    return state.user_profile;
  });
  const user_albums: IAlbum[] = useSelector((state: RootState) => {
    return state.user_albums;
  });
  const { album__id } = useParams();
  const metadata = {
    contentType: "image/jpeg",
  };
  const storageRef = ref(storage, "albums-images/" + file?.name);
  const docRef = doc(db, "users", user_profile.uid);
  const upload_to_server = (): void => {
    if (file) {
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setUploading(true);
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              // User canceled the upload
              break;

            // ...

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        async () => {
          const URL = await getDownloadURL(uploadTask.snapshot.ref).then(
            (downloadURL) => {
              return downloadURL;
            }
          );
          // updateDoc(docRef, {
          //   albums: arrayUnion({
          //     photos: [],
          //     thumb: URL,
          //     title: albumName,
          //     id: albumName.toLocaleLowerCase(),
          //     date: dateFormatter("m/d/y"),
          //     timestamp: new Date(),
          //   }),
          // });
          setUploading(false);
          setVisible(false);
        }
      );
    }
  };
  const fileChanger = (e: any): void => {
    const selected: File = e.target.files[0];
    console.log(selected);

    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError("");
      console.log("success");
    } else {
      setFile(null);
      setError("Please select a image file (jpg, png, gif or jpeg)");
      console.log("failed");
    }
  };
  const album: IAlbum =
    user_albums &&
    _.find(user_albums, (album) => {
      return album.id === album__id;
    })!;
  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setUrl("");
    }
  }, [file]);
  return (
    <>
      <section className="page-album h-100">
        <Header
          upper={
            <>
              <h3>{album && album.title}</h3>
            </>
          }
          down={
            <>
              <p>{album?.photos.length} Photos</p>
            </>
          }
        />
        <main className="px-5 pt-3 h-100 w-100">
          {album?.photos.length > 0 ? (
            <>photos</>
          ) : (
            <div className="empty pb-5 d-flex align-items-center justify-content-center w-100 h-100 flex-column">
              <img src={Empty} alt="" />
              <h3>Upload an image to see</h3>
              <Button
                onClick={() => {
                  setVisible(true);
                }}
                className="btn-primary mt-4 mb-5"
                size="large"
              >
                Add Image
              </Button>
            </div>
          )}
        </main>
      </section>
      <Modal
        className="my-modal"
        onCancel={() => {
          setVisible(false);
          setFile(null);
        }}
        onOk={() => setVisible(false)}
        footer={false}
        visible={visible}
        closeIcon={<></>}
        mask={false}
      >
        <div className="modal-wrapper position-fixed vw-100 vh-100 top-0">
          <div className="modal-content-wrapper">
            <div className={`modal-content shadow my-modal add-image-modal`}>
              <div className="btn-wrapper d-flex gap-2 align-items-center justify-content-end pt-3">
                {/* <Button
                  onClick={() => {
                    tl.reverse();
                  }}
                  className="ant-default-btn"
                >
                  Cancel
                </Button> */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <input onChange={fileChanger} type="file" />
                  {error !== "" && <p className="error">{error}</p>}
                  <Button>Upload</Button>
                </form>
                <img style={{ width: 280, height: 280 }} src={url} alt="" />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PageAlbum;
