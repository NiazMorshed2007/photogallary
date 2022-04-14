import React, { FC } from "react";
import { useParams } from "react-router-dom";
import * as _ from "lodash";
import { IAlbum } from "../interfaces/IAlbum";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import Header from "../components/Header";
import { Button } from "antd";
import Empty from "../assets/empty1.svg";

const PageAlbum: FC = () => {
  const user_albums: IAlbum[] = useSelector((state: RootState) => {
    return state.user_albums;
  });
  const { album__id } = useParams();
  const album: IAlbum =
    user_albums &&
    _.find(user_albums, (album) => {
      return album.id === album__id;
    })!;
  return (
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
            <Button className="btn-primary mt-4 mb-5" size="large">
              Add Image
            </Button>
          </div>
        )}
      </main>
    </section>
  );
};

export default PageAlbum;
