import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAlbums, setLoading } from "../actions";
import Header from "../components/Header";
import { IAlbum } from "../interfaces/IAlbum";
import { RootState } from "../reducers";
import * as _ from "lodash";
import Album from "../components/Album";
import { doc, updateDoc } from "firebase/firestore";
import { IProfile } from "../interfaces/IProfile";
import { db } from "../firebase/firebase";

const Favorite: FC = () => {
  const dispatch = useDispatch();
  const [favorite, setFavorite] = useState<boolean>(false);
  const user_albums: IAlbum[] = useSelector((state: RootState) => {
    return state.user_albums;
  });
  const fav_albums: IAlbum[] =
    user_albums &&
    _.filter(user_albums, (album) => {
      return album.favorite === true;
    });
  const user_profile: IProfile = useSelector((state: RootState) => {
    return state.user_profile;
  });
  const docRef = doc(db, "users", user_profile.uid);
  const setFavFunc = (id: string): void => {
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
    <section className="favorties-page pb-5 mb-3 overflow-auto h-100">
      <Header
        upper={
          <>
            <h2 className="header-title">Favorites </h2>
            {/* <div className="actions d-flex gap-3 align-items-center">
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
        </div> */}
          </>
        }
        down={
          <>
            <div className="pt-2">
              <span>lorem ipsum sut dolor emet ❤️</span>
            </div>
          </>
        }
      />
      <main className="px-5 pt-3 h-100 w-100">
        <div className="h-100">
          <div>
            <div className="albums-wrapper px-5 d-flex align-items-center justify-content-around flex-wrap pt-4 mt-2">
              {fav_albums.map((album) => (
                <Album
                  onFav={() => {
                    setFavFunc(album.id);
                  }}
                  isPreviewMode={false}
                  key={album.id}
                  album={album}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Favorite;
