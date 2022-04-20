import { Button, Modal } from "antd";
import { getAuth, deleteUser } from "firebase/auth";
import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setLogged } from "../actions";
import avatar from "../assets/character.png";
import Header from "../components/Header";
import { IProfile } from "../interfaces/IProfile";
import { RootState } from "../reducers";
import firebase, { db } from "../firebase/firebase";
import { deleteDoc, doc } from "firebase/firestore";

const SettingsPage: FC = () => {
  const dispatch = useDispatch();
  const auth = firebase && getAuth();
  const [visible, setVisible] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const user_profile: IProfile = useSelector((state: RootState) => {
    return state.user_profile;
  });
  const logout = (): void => {
    auth.signOut();
    dispatch(setLogged(false));
  };
  const deleteAccount = (): void => {
    const user = auth.currentUser!;
    deleteUser(user)
      .then(() => {
        deleteDoc(doc(db, "users", user_profile.uid));
        dispatch(setLogged(false));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 2000);
  }, []);
  return (
    <>
      <section className="settings-page pb-5 mb-3 overflow-auto h-100">
        <Header
          upper={<h2 className="header-title">Settings</h2>}
          down={
            <>
              <div className="pt-2">
                <span>Customize your profile ✏️</span>
              </div>
            </>
          }
        />
        <div className="h-100">
          <div className="px-5 w-100 pt-4 mt-2">
            <div className="d-flex  gap-5">
              <div className="avatar-wrapper">
                <img src={avatar} alt="" />
              </div>
              <div className="info">
                <form>
                  <label>
                    <p>Name:</p>
                    <input
                      type="text"
                      value={user_profile.displayName}
                      name="displayName"
                    />
                  </label>
                  <label className="mt-3">
                    <p>Email:</p>
                    <input
                      value={user_profile.email}
                      type="text"
                      name="email"
                    />
                  </label>
                </form>
              </div>
            </div>
            <div className="button-wrapper d-flex gap-2 px-4 pt-4">
              <Button onClick={logout} className="primary-btn">
                Logout
              </Button>
              <Button
                onClick={() => {
                  setVisible(true);
                }}
                className="danger-btn"
              >
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Modal
        className="my-modal"
        onCancel={() => {
          setVisible(false);
        }}
        onOk={() => setVisible(false)}
        footer={false}
        visible={visible}
        closeIcon={<></>}
        mask={false}
      >
        <div className="my-modal delete-modal shadow">
          <h4 className="mb-2">Delete Account</h4>
          <p className="m-0">
            You are about to <strong>permanently delete</strong> your
            <span> account</span>
          </p>
          <form>
            <label className="d-flex gap-1 align-items-center pt-2">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => setChecked && setChecked(!checked)}
              />
              I am aware that I <strong>cannot undo</strong> this.
            </label>
            <hr />
            <p className="des">
              Once you delete your account you can't get it back and all of your
              data will be deleted.
            </p>

            <div className="btn-wrapper pt-3 d-flex align-items-center justify-content-end gap-2">
              <Button
                className="delete-btn"
                type="primary"
                disabled={!checked}
                danger={checked ? true : false}
                onClick={deleteAccount}
              >
                Delete
              </Button>
              <Button onClick={() => setVisible(false)} className="default-btn">
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default SettingsPage;
