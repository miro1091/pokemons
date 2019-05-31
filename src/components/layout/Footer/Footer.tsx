import React from "react";
import moment from "moment";

const Footer = () => {
  return <div>Copyright © {moment().format("YYYY")}</div>;
};

export default Footer;
