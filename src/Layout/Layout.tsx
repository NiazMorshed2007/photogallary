import React, { FC, ReactNode, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { gsap, Power2, TweenMax } from "gsap";
import LoadingScreen from "../components/LoadingScreen";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = (props) => {
  const { children } = props;
  const loading: boolean = useSelector((state: RootState) => {
    return state.loading;
  });
  return (
    <main className="layout d-flex vh-100 vw-100">
      {loading && <LoadingScreen loading={loading} />}
      <Sidebar />
      <main className="content w-100">{children}</main>
    </main>
  );
};

export default Layout;
