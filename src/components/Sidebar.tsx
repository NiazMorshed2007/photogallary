import { Button } from "antd";
import { getAuth } from "firebase/auth";
import React, { FC } from "react";
import { BsArrowBarLeft } from "react-icons/bs";
import { MdMotionPhotosOn } from "react-icons/md";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { setLogged } from "../actions";
import firebase from "../firebase/firebase";
import { BiHomeAlt } from "react-icons/bi";
import { MdOutlineWallpaper } from "react-icons/md";

const Sidebar: FC = () => {
  const auth = firebase && getAuth();
  const dispatch = useDispatch();
  const logout = (): void => {
    // firebase.auth()
    //   .signOut()
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    auth.signOut();
    dispatch(setLogged(false));
  };
  return (
    <aside className={`sidebar border p-3 pt-4`}>
      <header className="d-flex px-2 align-items-center justify-content-between">
        <div className="d-flex logo-wrapper align-items-center gap-2 bg">
          <div
            className={`loader d-flex align-items-center justify-content-center`}
          >
            <MdMotionPhotosOn />
          </div>
          <h5 className="m-0 logo-text">Gallery</h5>
        </div>
        <div className="pointer sidebar-navigator">
          <BsArrowBarLeft />
        </div>
      </header>
      <main className="sidebar-items-wrapper d-flex flex-column gap-1 p-2 pt-3 mt-2">
        <NavLink to={"/"} className="item-link text-decoration-none">
          <div className="item">
            <BiHomeAlt />
            <p>Media Library</p>
          </div>
        </NavLink>
        <NavLink to={"/create"} className="item-link text-decoration-none">
          <div className="item">
            <MdOutlineWallpaper />
            <p>Create Album</p>
          </div>
        </NavLink>
      </main>
      <Button
        className="position-absolute mb-4 bottom-0 btn-primary"
        onClick={() => logout()}
      >
        log out
      </Button>
      {/*<Button variant="contained" color='warning'>click</Button>*/}
    </aside>
  );
};

export default Sidebar;
