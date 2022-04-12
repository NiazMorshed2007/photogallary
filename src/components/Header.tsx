import React, { FC, ReactNode } from "react";

interface Props {
  upper: ReactNode;
  down: ReactNode;
}

const Header: FC<Props> = (props) => {
  const { upper, down } = props;
  return (
    <header className="main-header px-5 pb-2 w-100">
      <div className="upper d-flex align-items-center justify-content-between">
        {upper}
      </div>
      <div className="down">{down}</div>
    </header>
  );
};

export default Header;
