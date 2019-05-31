import { makeStyles, createStyles } from "@material-ui/core/styles";

export default makeStyles(() =>
  createStyles({
    cardWrapper: {
      maxWidth: "1600px",
      margin: "0 auto",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      paddingTop: "70px"
    }
  })
);
