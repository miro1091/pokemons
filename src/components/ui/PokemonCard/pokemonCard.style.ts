import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";

export default makeStyles((theme: Theme) =>
  createStyles({
    moreDetails: {
      fontSize: "12px"
    },
    card: {
      width: "300px",
      margin: "20px",
      position: "relative",
      "& a": {
        textDecoration: "none",
        textTransform: "capitalize",
        color: "#000"
      }
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
      backgroundSize: "contain"
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest
      })
    },
    expandOpen: {
      transform: "rotate(180deg)"
    },
    avatar: {
      backgroundColor: red[500]
    },
    collapse: {
      position: "absolute",
      top: "0",
      backgroundColor: "#fff",
      width: "80%",
      fontSize: "10px"
    },
    greenGraphLine: {
      border: "3px solid green !important"
    },
    baseStats: {
      "& > div": {
        fontWeight: "bold"
      },
      "& table": {
        width: "100%",

        "& tr > td:first-child": {
          textAlign: "right"
        },
        "& tr > td:last-child": {
          width: "100px"
        },
        "& span": {
          display: "block",
          border: "3px solid orange",
          borderRadius: "3px"
        }
      }
    },
    pokedexData: {
      marginTop: "8px",
      "& > div": {
        fontWeight: "bold"
      },
      "& table": {
        width: "100%",

        "& tr > td:first-child": {
          textAlign: "right"
        },
        "& tr > td:last-child": {
          textAlign: "left",
          paddingLeft: "5px"
        }
      }
    },
    pokemonType: {
      display: "flex",
      itemsAlign: "center",
      "& p": {
        margin: "0 2px 0 2px",
        padding: "3px 5px",
        backgroundColor: "orange",
        borderRadius: "5px",
        border: "1px solid #000",
        color: "#fff"
      }
    },
    pokemonSpecies: {
      fontWeight: 600,
      textTransform: "capitalize"
    },
    bolderText: {
      fontWeight: 600
    },
    pokemonAbilities: {
      "& > p": {
        margin: "0"
      }
    }
  })
);
