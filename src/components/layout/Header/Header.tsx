import React from "react";
import { RouteComponentProps } from "react-router-dom";
import PrimarySearchAppBar from "../../ui/PrimarySearchAppBar";

const Header = ({ history }: { history: any }) => {
  return <PrimarySearchAppBar history={history} />;
};

export default Header;
