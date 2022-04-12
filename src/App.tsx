import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { setAlbums, setLogged, setProfile } from "./actions";
import firebase, { db } from "./firebase/firebase";
import { IProfile } from "./interfaces/IProfile";
import Layout from "./Layout/Layout";
import Auth from "./Pages/Auth";
import Create from "./Pages/Create";
import Home from "./Pages/home";
import PageAlbum from "./Pages/Page.Album";
import { RootState } from "./reducers";

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
        console.log("cat");
      } else {
        console.log("signed out");
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    console.log(user_profile.uid);
    if (!loading) {
      if (user_profile.uid) {
        dispatch(setLogged(true));
      }
    }
  }, [loading]);
  useEffect(() => {
    const getData = async (): Promise<void> => {
      if (isLogged && !loading) {
        const docRef = doc(db, "users", user_profile.uid);
        const docSnap = await getDoc(docRef);
        const user_data: DocumentData = [];
        user_data.push(docSnap.data());
        // if (user_data.albums) {
        console.log(docSnap?.data()?.albums);
        // dispatch(setAlbums(user_data.albums));
        // }
        // } else {
        // console.log("No such document!");
      }
      console.log("calling");
      console.log(isLogged);
    };
    getData();
  }, [loading]);
  return (
    <>
      {loading ? (
        "loading"
      ) : (
        <>
          {isLogged ? (
            <Layout>
              <Routes>
                <Route path={"/"} element={<Home />} />
                <Route path={"/album/:album__id"} element={<PageAlbum />} />
                <Route path="/create" element={<Create />} />
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
