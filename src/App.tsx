import React, { FC, useEffect, useState } from "react";
import Layout from "./Layout/Layout";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Pages/home";
import PageAlbum from "./Pages/Page.Album";
import { useSelector } from "react-redux";
import { RootState } from "./reducers";
import Auth from "./Pages/Auth";
import firebase from "./firebase/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setLogged, setProfile } from "./actions";
import { IProfile } from "./firebase/IProfile";

const App: FC = () => {
  const auth = firebase && getAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const isLogged: boolean = useSelector((state: RootState) => {
    return state.isLogged;
  });
  const user_profile: IProfile = useSelector((state: RootState) => {
    return state.user_profile;
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const user_obj: IProfile = {
          displayName: user?.displayName!,
          email: user?.email!,
          photoUrl: user?.photoURL!,
          emailVerified: user?.emailVerified!,
          uid: user?.uid!,
        };
        dispatch(setProfile(user_obj));
        setLoading(false);
      } else {
        console.log("signed out");
        setLoading(false);
      }
    });
  }, [auth]);

  useEffect(() => {
    if (user_profile.uid !== "") {
      dispatch(setLogged(true));
    }
  }, [user_profile]);
  return (
    <>
      {loading ? (
        "loading"
      ) : (
        <>
          {isLogged && user_profile.uid !== "" ? (
            <Layout>
              <Routes>
                <Route path={"/"} element={<Home />} />
                <Route path={"/album/:album__id"} element={<PageAlbum />} />
              </Routes>
            </Layout>
          ) : (
            <Auth />
          )}
        </>
      )}
    </>
  );
};

export default App;
