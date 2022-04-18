import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../actions";
import Header from "../components/Header";

const Favorite: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 2000);
  }, []);
  return (
    <section className="favorties-page">
      <Header
        upper={
          <>
            <h2 className="header-title">Favorites </h2>
            {/* <div className="actions d-flex gap-3 align-items-center">
          <div className="preview-option btn-header d-flex gap-2 align-items-center pointer">
            <BsUiRadiosGrid />
            <span>Show Preview</span>
          </div>
          <div
            onClick={() => {
              navigate("/create");
            }}
            className="add-new-dir btn-header preview-option d-flex gap-1 align-items-center pointer"
          >
            <HiOutlinePlusSm />
            <span>Add new</span>
          </div>
        </div> */}
          </>
        }
        down={
          <>
            <div className="pt-2"></div>
          </>
        }
      />
    </section>
  );
};

export default Favorite;
