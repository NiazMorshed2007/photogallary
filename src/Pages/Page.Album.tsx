import React, { FC, FormEvent, useEffect, useState } from "react";
import { Button } from "antd";
import Modal from "antd/lib/modal/Modal";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import * as _ from "lodash";
import { HiOutlinePlusSm } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setAlbums, setLoading } from "../actions";
import Empty from "../assets/empty1.svg";
import Header from "../components/Header";
import Photo from "../components/Photo";
import ProgressBar from "../components/ProgressBar";
import { db, storage } from "../firebase/firebase";
import { IAlbum } from "../interfaces/IAlbum";
import { IPhoto } from "../interfaces/IPhoto";
import { IProfile } from "../interfaces/IProfile";
import { RootState } from "../reducers";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { MdClear } from "react-icons/md";

const PageAlbum: FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [favorite, setFavorite] = useState<boolean>(false);
  const [slidermodalVisible, setSliderModalVisible] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);
  const types: String[] = ["image/png", "image/jpg", "image/jpeg", "image/gif"];
  const [photos, setPhotos] = useState<IPhoto[]>([]);
  const [file, setFile] = useState<any>(null);
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [url, setUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  const showAddModal = (): void => {
    setVisible(true);
  };
  const hideAddModal = (): void => {
    setVisible(false);
  };
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
  const next = (): void => {
    if (index < photos.length - 1) {
      setIndex(index + 1);
      console.log(index, "dec_based");
    }
  };
  const prev = (): void => {
    if (index > 0) {
      setIndex(index - 1);
      console.log(index, "inc_based");
    }
  };
  const storageRef = ref(storage, "images/" + file?.name);
  const docRef = doc(db, "users", user_profile.uid);
  const upload = (): void => {
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
            photo__url: URL,
            photo__id: (Math.random() * 15252120324).toString(),
            favorite: favorite,
          });
          dispatch(setAlbums([...user_albums]));
          updateDoc(docRef, {
            albums: user_albums,
          });
          setUploading(false);
          hideAddModal();
          setFile(null);
        }
      );
    }
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    upload();
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
  const FavImageSetter = (id: string): void => {
    const img_index = _.findIndex(album && album.photos, (photo) => {
      return photo.photo__id === id;
    });
    album.photos[img_index].favorite = !album.photos[img_index].favorite;
    dispatch(setAlbums([...user_albums]));
    updateDoc(docRef, {
      albums: user_albums,
    });
  };
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
      dispatch(setLoading(true));
      if (user_profile.uid !== "") {
        const snap = onSnapshot(doc(db, "users/" + user_profile.uid), (doc) => {
          const photos_data = doc.data()?.albums.find((album: any) => {
            return album.id === album__id;
          }).photos;
          setPhotos(photos_data);
          dispatch(setLoading(false));
          console.log("gfsdfg");
        });
      }
    };
    getPhotos();
  }, []);
  return (
    <>
      <section className="page-album overflow-auto pb-4 h-100">
        <Header
          upper={
            <>
              <h3>{album && album.title}</h3>
              <div className="actions d-flex gap-3 align-items-center">
                {/* <div className="preview-option btn-header d-flex gap-2 align-items-center pointer">
                  <BsUiRadiosGrid />
                  <span>Show Preview</span>
                </div> */}
                <div
                  onClick={showAddModal}
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
        <main className="px-5 pt-3 h-100 w-100">
          {photos && photos.length > 0 ? (
            <>
              <p className="photos-title mb-3">Photos</p>
              <div className="photos-wrapper flex-wrap d-flex align-items-center gap-2">
                {photos &&
                  photos.map((photo, i) => (
                    <Photo
                      onFav={() => {
                        FavImageSetter(photo.photo__id);
                      }}
                      previewMode={false}
                      onFuction={() => {
                        setSliderModalVisible(true);
                        setIndex(i);
                      }}
                      album={album}
                      photo={photo}
                      key={i}
                    />
                  ))}
              </div>
            </>
          ) : (
            <div className="empty pb-5 d-flex align-items-center justify-content-center w-100 h-100 flex-column">
              <img src={Empty} alt="" />
              <h3>Upload an image to see</h3>
              <Button
                onClick={showAddModal}
                className="primary-btn-fill mt-4 mb-5"
              >
                Add Image
              </Button>
            </div>
          )}
        </main>
      </section>
      {visible && (
        <Modal
          className="my-modal"
          onCancel={() => {
            hideAddModal();
            setFile(null);
          }}
          onOk={hideAddModal}
          footer={false}
          visible={visible}
          closeIcon={<></>}
          mask={false}
        >
          <div className="modal-wrapper position-fixed vw-100 vh-100 top-0">
            <div className="modal-content-wrapper">
              <div className={`modal-content shadow my-modal add-image-modal`}>
                <form onSubmit={handleSubmit}>
                  <div className="d-flex gap-4 align-items-center">
                    <div className="wrap d-flex flex-column">
                      <input onChange={fileChanger} type="file" />
                      {error !== "" && <p className="error">{error}</p>}
                      {uploading && <ProgressBar progress={progress} />}
                    </div>
                    <Photo
                      onFav={() => setFavorite(!favorite)}
                      photo={null}
                      previewMode={true}
                      preview_url={url}
                      onFuction={() => {}}
                      album={album}
                    />
                  </div>
                  <div className="btn-wrapper mt-3 d-flex gap-2 align-items-center justify-content-end pt-3">
                    <Button
                      className="primary-btn-fill"
                      type="primary"
                      htmlType="submit"
                      disabled={file === null}
                      // ={checked ? true : false}
                    >
                      Upload
                    </Button>
                    <Button
                      onClick={() => setVisible(false)}
                      className="default-btn"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* slider modal */}
      <Modal
        className="my-modal"
        onCancel={() => {
          setSliderModalVisible(false);
        }}
        onOk={() => {
          setSliderModalVisible(false);
        }}
        footer={false}
        visible={slidermodalVisible}
        closeIcon={<></>}
        mask={false}
      >
        <div className="my-modal slider-modal shadow">
          <i onClick={prev} className="arrow arrow-left">
            <BsArrowLeft />
          </i>
          <i onClick={next} className="arrow arrow-right">
            <BsArrowRight />
          </i>
          <i
            onClick={() => {
              setSliderModalVisible(false);
            }}
            className="icon cross"
          >
            <MdClear />
          </i>
          <div className="imgs-wrapper">
            <div
              style={{
                transform: `translateX(${-780 * index}px)`,
              }}
              className="imgs-inner-wrapper d-flex"
            >
              {photos &&
                photos.map((photo) => (
                  <div className="img-wrapper" key={photo.photo__id}>
                    <img src={photo.photo__url} alt="" />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PageAlbum;
