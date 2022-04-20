import React, { FC } from "react";
import { BiHomeAlt } from "react-icons/bi";
import { BsArrowBarLeft } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import {
  MdMotionPhotosOn,
  MdOutlineFavoriteBorder,
  MdOutlineWallpaper,
} from "react-icons/md";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import avatar from "../assets/character.png";
import { IProfile } from "../interfaces/IProfile";
import { RootState } from "../reducers";

const Sidebar: FC = () => {
  const user_profile: IProfile = useSelector((state: RootState) => {
    return state.user_profile;
  });
  return (
    <aside className={`sidebar border p-3 pt-4`}>
      <header className="d-flex px-2 align-items-center justify-content-between">
        <div className="d-flex logo-wrapper align-items-center gap-2 bg">
          <MdMotionPhotosOn />
          <h5 className="m-0 logo-text">Gallery</h5>
        </div>
        <div className="pointer sidebar-navigator">
          <BsArrowBarLeft />
        </div>
      </header>
      <main className="sidebar-items-wrapper d-flex flex-column gap-1 p-1 pt-3 mt-2">
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
        <NavLink to={"/favorites"} className="item-link text-decoration-none">
          <div className="item">
            <MdOutlineFavoriteBorder />
            <p>Favorites</p>
          </div>
        </NavLink>
        <NavLink to={"/settings"} className="item-link text-decoration-none">
          <div className="item">
            <FiSettings />
            <p>Settings</p>
          </div>
        </NavLink>
      </main>
      <footer className="position-absolute mb-4 bottom-0">
        <div className="d-flex gap-2 align-items-center">
          <div className="avatar-wrapper shadow">
            <img
              src={user_profile?.photoUrl ? user_profile.photoUrl : avatar}
              alt=""
            />
          </div>
          <p>
            {user_profile && user_profile.displayName !== ""
              ? user_profile.displayName
              : "anonymus"}
          </p>
        </div>
        {/* <Button className="btn-primary" onClick={() => logout()}>
          log out
        </Button> */}
      </footer>

      {/*<Button variant="contained" color='warning'>click</Button>*/}
    </aside>
  );
};

export default Sidebar;
