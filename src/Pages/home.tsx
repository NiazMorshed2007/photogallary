import { Button } from "antd";
import React, { FC } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Empty from "../assets/empty1.svg";
import Header from "../components/Header";
import { RootState } from "../reducers";
import { BsUiRadiosGrid } from "react-icons/bs";
import { HiOutlinePlusSm } from "react-icons/hi";
import Album from "../components/Album";
import { IAlbum } from "../interfaces/IAlbum";

const Home: FC = () => {
  const navigate = useNavigate();
  const user_albums: IAlbum[] = useSelector((state: RootState) => {
    return state.user_albums;
  });
  return (
    <section className="home py-3 pb-5 mb-3 overflow-auto px-2">
      <Header
        upper={
          <>
            <h2 className="header-title">Media Library </h2>
            <div className="actions d-flex gap-3 align-items-center">
              <div className="preview-option btn-header d-flex gap-2 align-items-center pointer">
                <BsUiRadiosGrid />
                <span>Show Preview</span>
              </div>
              <div className="add-new-dir btn-header preview-option d-flex gap-1 align-items-center pointer">
                <HiOutlinePlusSm />
                <span>Add new</span>
              </div>
            </div>
          </>
        }
        down={
          <>
            <div className="pt-2">
              <span className="total__albums">24 Albums of photos</span>
            </div>
          </>
        }
      />
      <p>{user_albums.length}</p>
      {user_albums.length > 0 ? (
        <div className="albums-wrapper d-flex align-items-center justify-content-between flex-wrap pt-3">
          {user_albums.map((album) => (
            <Album key={album.id} album={album} />
          ))}
        </div>
      ) : (
        <div className="empty mt-4 d-flex align-items-center justify-content-center w-100 h-100 flex-column">
          <img src={Empty} alt="" />
          <h3>Create a Album to get started 🚀</h3>
          <Button
            onClick={() => {
              navigate("/create");
            }}
            className="btn-primary mt-4"
            size="large"
          >
            Create
          </Button>
        </div>
      )}
      {/* {albums.map((album) => (
          <Album
            key={album.id}
            id={album.id}
            img__src={album.picture}
            title={album.title}
            date={album.date}
          />
        ))} */}
    </section>
  );
};

export default Home;
