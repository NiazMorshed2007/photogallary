import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { gsap, Power2 } from "gsap";
import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import firebase, { db } from "../firebase/firebase";
import { IProfile } from "../interfaces/IProfile";

const Auth: FC = () => {
  const auth = firebase && getAuth();
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("");
  const [isSigningUp, setIsSigningUp] = useState<boolean>(false);
  const authenticate = (): void => {
    if (isSigningUp) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          const user_profile: IProfile = {
            displayName: (user?.displayName ? user.displayName : user?.email)!,
            photoUrl: user?.photoURL!,
            email: user?.email!,
            emailVerified: user?.emailVerified!,
            uid: user?.uid!,
          };
          setErrMsg("");
          await setDoc(doc(db, "users", user?.uid), {
            ...user_profile,
            albums: [],
          });
        })
        .catch((err) => {
          switch (err.code) {
            case "auth/email-already-in-use":
              {
                setErrMsg("This email is alerady in use");
              }
              break;
            case "auth/invalid-email":
              {
                setErrMsg("This email doesn't exists");
              }
              break;
            case "auth/weak-password": {
              setErrMsg("Please enter a strong password(at least 6 chars)");
            }
          }
        });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setErrMsg("");
        })
        .catch((err) => {
          setErrMsg("Invalid email or password");
        });
    }
    setEmail("");
    setPassword("");
    navigate("/");
  };
  useEffect(() => {
    let tl = gsap.timeline();
    tl.fromTo(
      "h1",
      {
        opacity: 0,
        duration: 4,
        y: 80,
        rotationX: 90,
        transformOrigin: "0% 50% -50%",
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        stagger: 0.3,
        ease: Power2.easeOut,
      }
    )
      .fromTo(
        ".right",
        {
          width: 0 + "px",
          duration: 3,
        },
        {
          width: 90 + "%",
          ease: Power2.easeOut,
        }
      )
      .fromTo(
        ".right",
        {
          opacity: 0,
        },
        {
          opacity: 1,
        }
      );
  }, []);
  useEffect(() => {
    setErrMsg("");
  }, [isSigningUp]);
  return (
    <section className="login vh-100 vw-100 d-flex">
      <div className="left d-flex flex-column align-items-center justify-content-center position-relative p-5 h-100">
        <h1>Create the entire scene</h1>
        <h1 className="mx-5 px-5">Simply!</h1>
        <h1 className="px-5">???</h1>
        <div className="img-wrapper position-absolute">
          {/* <img src={sideImage} alt="" /> */}
        </div>
      </div>
      <div className="right position-relative d-flex flex-column gap-3 align-items-center justify-content-center">
        <p className="position-absolute sign-up-link">
          {isSigningUp ? "Already have an account?" : "Don't have an account?"}
          <span
            className="pointer px-2"
            onClick={() => {
              setIsSigningUp(!isSigningUp);
            }}
          >
            Sign {isSigningUp ? "in" : "up"}
          </span>
        </p>
        <h2 className="mb-3">Sign {isSigningUp ? "Up" : "In"}</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            authenticate();
          }}
        >
          <div className="form-item">
            <input
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="text"
              placeholder={"Enter your Email Address"}
            />
          </div>
          <div className="form-item mb-1">
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
              type="password"
              placeholder={"Password"}
            />
          </div>
          {errMsg !== "" && (
            <>
              <span className="err-msg">{errMsg}</span>
            </>
          )}
          <button className="btn-submit btn mt-2">Sign In</button>
        </form>
      </div>
    </section>
  );
};

export default Auth;
