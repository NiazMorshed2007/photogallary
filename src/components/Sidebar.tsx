import React, { FC } from "react";
import { MdMotionPhotosOn } from "react-icons/md";
import { BsArrowBarLeft } from "react-icons/bs";
import { getAuth } from "firebase/auth";
import firebase from "../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import { setLogged } from "../actions";
import { Button } from "antd";

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
      <header className="d-flex align-items-center justify-content-between">
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
