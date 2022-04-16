import { Button } from "antd";
import Modal from "antd/lib/modal/Modal";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import * as _ from "lodash";
import React, { FC, useEffect, useState } from "react";
import { BsUiRadiosGrid } from "react-icons/bs";
import { HiOutlinePlusSm } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setAlbums } from "../actions";
import Empty from "../assets/empty1.svg";
import Header from "../components/Header";
import ProgressBar from "../components/ProgressBar";
import { db, storage } from "../firebase/firebase";
import { dateFormatter } from "../functions/DateFormatter";
import { IAlbum } from "../interfaces/IAlbum";
import { IPhoto } from "../interfaces/IPhoto";
import { IProfile } from "../interfaces/IProfile";
import { RootState } from "../reducers";

const PageAlbum: FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const types: String[] = ["image/png", "image/jpg", "image/jpeg", "image/gif"];
  const [photos, setPhotos] = useState<IPhoto[]>([]);
  const [file, setFile] = useState<any>(null);
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
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
  const storageRef = ref(storage, "images/" + file?.name);
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
          album.photos.push({
            photo__name: "name",
            photo__url: URL,
            photo__id: "adsf",
            date: dateFormatter("m/h/d/m"),
          });
          dispatch(setAlbums([...user_albums]));
          updateDoc(docRef, {
            albums: user_albums,
          });
          setUploading(false);
          setVisible(false);
          setFile(null);
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
  useEffect(() => {
    const getPhotos = async (): Promise<void> => {
      setLoading(true);
      if (user_profile.uid !== "" && loading) {
        const snap = onSnapshot(doc(db, "users/" + user_profile.uid), (doc) => {
          const photos_data = doc.data()?.albums.find((album: any) => {
            return album.id === album__id;
          }).photos;
          setPhotos(photos_data);
          setLoading(false);
        });
      }
    };
    getPhotos();
  }, []);
  return (
    <>
      <section className="page-album h-100">
        <Header
          upper={
            <>
              <h3>{album && album.title}</h3>
              <div className="actions d-flex gap-3 align-items-center">
                <div className="preview-option btn-header d-flex gap-2 align-items-center pointer">
                  <BsUiRadiosGrid />
                  <span>Show Preview</span>
                </div>
                <div
                  onClick={() => {
                    setVisible(true);
                  }}
                  className="add-new-dir btn-header preview-option d-flex gap-1 align-items-center pointer"
                >
                  <HiOutlinePlusSm />
                  <span>Add new</span>
                </div>
              </div>
            </>
          }
          down={
            <>
              <p>{album?.photos.length} Photos</p>
            </>
          }
        />
        {loading ? (
          <>loading .. .. . .</>
        ) : (
          <main className="px-5 pt-3 h-100 w-100">
            {photos.length > 0 ? (
              <>
                <p className="photos-title mb-3">Photos</p>
                <div className="photos-wrapper d-flex align-items-center gap-2">
                  {photos &&
                    photos.map((photo, i) => (
                      <div key={i} className="img-holder">
                        <img src={photo.photo__url} alt="" />
                      </div>
                    ))}
                </div>
              </>
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
        )}
      </section>
      {visible && (
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
                      upload_to_server();
                    }}
                  >
                    <input onChange={fileChanger} type="file" />
                    {error !== "" && <p className="error">{error}</p>}
                    {uploading && <ProgressBar progress={progress} />}
                    <Button onClick={() => upload_to_server()}>Upload</Button>
                  </form>
                  <img style={{ width: 280, height: 280 }} src={url} alt="" />
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default PageAlbum;
