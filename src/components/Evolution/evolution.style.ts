import { makeStyles, createStyles } from "@material-ui/core/styles";

export default makeStyles(() =>
  createStyles({
    evolutionWrapper: {
      paddingTop: "70px"
    },
    evolutionFlow: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      maxWidth: "600px",
      margin: "auto"
    },
    evolutionFlowItem: {
      "& p": {
        margin: "1px",
        textTransform: "capitalize",
        "&:last-child": {
          color: "orange"
        },
        "&:nth-child(3)": {
          color: "blue"
        }
      },

      "& span": {
        textTransform: "capitalize",
        margin: "0 2px"
      }
    }
  })
);
