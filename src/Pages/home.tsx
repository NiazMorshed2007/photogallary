import { Button } from "antd";
import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Empty from "../assets/empty1.svg";
import Header from "../components/Header";
import { RootState } from "../reducers";
import { BsUiRadiosGrid } from "react-icons/bs";
import { HiOutlinePlusSm } from "react-icons/hi";
import Album from "../components/Album";
import { IAlbum } from "../interfaces/IAlbum";
import { setAlbums, setLoading } from "../actions";
import * as _ from "lodash";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { IProfile } from "../interfaces/IProfile";

const Home: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user_albums: IAlbum[] = useSelector((state: RootState) => {
    return state.user_albums;
  });
  const user_profile: IProfile = useSelector((state: RootState) => {
    return state.user_profile;
  });
  const docRef = doc(db, "users", user_profile.uid);
  const setFavorite = (id: string): void => {
    const album_index: number =
      user_albums &&
      _.findIndex(user_albums, (album) => {
        return album.id === id;
      })!;
    user_albums[album_index].favorite = !user_albums[album_index].favorite;
    dispatch(setAlbums([...user_albums]));
    updateDoc(docRef, {
      albums: user_albums,
    });
  };
  useEffect(() => {
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 2000);
  }, []);
  return (
    <section className="home pb-5 mb-3 overflow-auto h-100">
      <Header
        upper={
          <>
            <h2 className="header-title">Media Library </h2>
            <div className="actions d-flex gap-3 align-items-center">
              <div className="preview-option btn-header d-flex gap-2 align-items-center pointer">
                <BsUiRadiosGrid />
                <span>Show Preview</span>
              </div>
              <div
                onClick={() => {
                  navigate("/create");
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
            <div className="pt-2">
              <span className="total__albums">
                {user_albums.length} Albums of photos
              </span>
            </div>
          </>
        }
      />
      {user_albums.length > 0 ? (
        <div className="h-100">
          <div>
            <div className="albums-wrapper px-5 d-flex flex-wrap pt-4 mt-2 gap-3">
              {user_albums.map((album) => (
                <Album
                  onFav={() => {
                    setFavorite(album.id);
                  }}
                  isPreviewMode={false}
                  key={album.id}
                  album={album}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="empty mt-4 d-flex align-items-center justify-content-center w-100 h-100 flex-column">
          <img className="empty-image" src={Empty} alt="" />
          <h3>Create a Album to get started 🚀</h3>
          <Button
            onClick={() => navigate("/create")}
            className="primary-btn-fill mt-4 mb-5"
          >
            Create
          </Button>
        </div>
      )}
    </section>
  );
};

export default Home;
