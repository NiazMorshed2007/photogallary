import React, { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import Empty from "../assets/empty1.svg";
import { Button } from "antd";

const Home: FC = () => {
  const user_albums: [] = useSelector((state: RootState) => {
    return state.user_albums;
  });
  return (
    <section className="home py-3 pb-5 mb-3 overflow-auto px-5">
      {user_albums.length > 0 ? (
        <div className="albums-wrapper d-flex align-items-center justify-content-between flex-wrap pt-3"></div>
      ) : (
        <div className="empty mt-4 d-flex align-items-center justify-content-center w-100 h-100 flex-column">
          <img src={Empty} alt="" />
          <h3>Create a Album to get started 🚀</h3>
          <Button className="btn-primary mt-4" size="large">
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
