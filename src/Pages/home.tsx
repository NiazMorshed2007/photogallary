import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import albums from "../album.static.json";
import Album from "../components/Album";
import { IProfile } from "../interfaces/IProfile";
import { RootState } from "../reducers";

const Home: FC = () => {
  return (
    <section className="home py-3 pb-5 mb-3 overflow-auto h-100 px-5">
      <div className="albums-wrapper d-flex align-items-center justify-content-between flex-wrap pt-3">
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
