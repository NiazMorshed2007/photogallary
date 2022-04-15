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
            <div className="albums-wrapper px-5 d-flex align-items-center justify-content-around flex-wrap pt-4 mt-2">
              {user_albums.map((album) => (
                <Album isPreviewMode={false} key={album.id} album={album} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="empty mt-4 d-flex align-items-center justify-content-center w-100 h-100 flex-column">
          <img className="empty-image" src={Empty} alt="" />
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
