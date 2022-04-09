import React, { FC, useEffect } from "react";
import Layout from "./Layout/Layout";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Pages/home";
import PageAlbum from "./Pages/Page.Album";
import { useSelector } from "react-redux";
import { RootState } from "./reducers";
import Auth from "./Pages/Auth";
import firebase from "./firebase/firebase";
import { getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setProfile } from "./actions";
import { IProfile } from "./firebase/IProfile";

const App: FC = () => {
  const auth = firebase && getAuth();
  const user = auth.currentUser;
  const dispatch = useDispatch();
  const user_profile: IProfile = useSelector((state: RootState) => {
    return state.user_profile;
  });

  const navigate = useNavigate();
  useEffect(() => {
    navigate("/login");
  }, []);
  useEffect(() => {
    if (user !== null) {
      const user_obj: IProfile = {
        displayName: user?.displayName!,
        email: user?.email!,
        photoUrl: user?.photoURL!,
        emailVerified: user?.emailVerified!,
        uid: user.uid,
      };
      dispatch(setProfile(user_obj));
    }
    console.log(user_profile);
  }, []);
  return (
    <>
      {/* {isAuth ? (
        <Layout>
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/album/:album__id"} element={<PageAlbum />} />
          </Routes>
        </Layout>
      ) : ( */}
      <Auth />
      {/* )} */}
    </>
  );
};

export default App;
