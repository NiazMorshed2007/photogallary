import React, { FC } from "react";
import { useParams } from "react-router-dom";
import * as _ from "lodash";
import { IAlbum } from "../interfaces/IAlbum";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";

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
    <section className="page-album">
      {album && <div>{album.title}</div>}
    </section>
  );
};

export default PageAlbum;
