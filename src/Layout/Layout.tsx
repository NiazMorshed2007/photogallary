import React, { FC, ReactNode, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { gsap, Power2, TweenMax } from "gsap";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = (props) => {
  const { children } = props;
  // const isLoaded: boolean = useSelector((state: RootState) => {
  //     return state.loaded;
  // });
  // useEffect(() => {
  //   //all animations of home page
  //   let tl = gsap.timeline({ delay: 2 });
  //   TweenMax.to(".loader > svg", {
  //     rotate: 360,
  //     repeat: -1,
  //     duration: 1,
  //     ease: Power2.easeOut,
  //   });
  //   tl.fromTo(
  //     ".loader",
  //     2,
  //     {
  //       width: 100 + "vw",
  //       height: 100 + "vh",
  //       opacity: 1,
  //       position: "fixed",
  //       top: 0,
  //       left: 0,
  //     },
  //     {
  //       top: 0,
  //       left: 4,
  //       width: 25 + "px",
  //       position: "relative",
  //       height: 25 + "px",
  //       ease: Power2.easeOut,
  //     }
  //   )
  //     .fromTo(
  //       ".loader > svg",
  //       {
  //         fontSize: "38px",
  //       },
  //       {
  //         fontSize: "20px",
  //       }
  //     )
  //     .to(".layer", {
  //       opacity: 0,
  //       duration: 1,
  //       ease: Power2.easeOut,
  //     })
  //     .fromTo(
  //       ".logo-text",
  //       {
  //         opacity: 0,
  //         y: 20,
  //       },
  //       {
  //         opacity: 1,
  //         y: 0,
  //         ease: Power2.easeOut,
  //       }
  //     )
  //     .fromTo(
  //       ".sidebar-navigator",
  //       {
  //         opacity: 0,
  //         x: 20,
  //       },
  //       {
  //         opacity: 1,
  //         x: 0,
  //       },
  //       "<"
  //     )
  //     .to(".sidebar", {
  //       boxShadow: "0 0.125rem 0.25rem rgb(235 225 225 / 51%)",
  //     })
  //     .fromTo(
  //       ".header-title",
  //       {
  //         opacity: 0,
  //         y: 20,
  //       },
  //       {
  //         opacity: 1,
  //         y: 0,
  //         ease: Power2.easeOut,
  //       },
  //       "<"
  //     )
  //     .fromTo(
  //       ".down",
  //       {
  //         opacity: 0,
  //         y: 20,
  //       },
  //       {
  //         opacity: 1,
  //         y: 0,
  //         ease: Power2.easeOut,
  //       },
  //       "<"
  //     )
  //     .fromTo(
  //       ".btn-header",
  //       {
  //         opacity: 0,
  //         y: 20,
  //         delay: 0.3,
  //       },
  //       {
  //         opacity: 1,
  //         y: 0,
  //         stagger: 0.3,
  //         ease: Power2.easeOut,
  //       },
  //       "<"
  //     )
  //     .fromTo(
  //       ".albums-wrapper > .album",
  //       {
  //         opacity: 0,
  //         y: 50,
  //       },
  //       {
  //         y: 0,
  //         opacity: 1,
  //         stagger: 0.035,
  //         ease: Power2.easeOut,
  //       }
  //     );
  // }, []);
  return (
    <main className="layout d-flex vh-100 vw-100">
      {/* <div
        className="layer vh-100 vw-100 position-fixed"
        // style={{ pointerEvents: "none", background: "white" }}
      ></div> */}
      <Sidebar />
      <main className="content w-100">{children}</main>
    </main>
  );
};

export default Layout;
