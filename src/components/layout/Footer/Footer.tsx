import React from "react";
import moment from "moment";
import useStyles from "./footer.style";

const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.footer}>Copyright © {moment().format("YYYY")}</div>
  );
};

export default Footer;
