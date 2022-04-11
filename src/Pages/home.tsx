import React, { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";

const Home: FC = () => {
  const user_albums: [] = useSelector((state: RootState) => {
    return state.user_albums;
  });
  return (
    <section className="home py-3 pb-5 mb-3 overflow-auto h-100 px-5">
      <div className="albums-wrapper d-flex align-items-center justify-content-between flex-wrap pt-3">
        <p>{user_albums.length}</p>
        {/* {albums.map((album) => (
          <Album
            key={album.id}
            id={album.id}
            img__src={album.picture}
            title={album.title}
            date={album.date}
          />
        ))} */}
      </div>
    </section>
  );
};

export default Home;
