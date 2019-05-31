import React, { useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CircularProgress from "@material-ui/core/CircularProgress";
import useStyles from "./pokemonCard.style";

export interface PokemonCardProps {
  name: string;
  url: string;
}

function PokemonCard({ data }: any) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.card}>
      <Link to={`evolution/${data.pokemon_id}`}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              {data.name.charAt(0).toUpperCase()}
            </Avatar>
          }
          title={data.name}
        />
        <CardMedia
          className={classes.media}
          image={data.sprite}
          title={data.name}
        />
      </Link>

      <CardActions disableSpacing>
        <p>More details</p>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="Show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>

      <Collapse
        className={classes.collapse}
        in={expanded}
        timeout="auto"
        unmountOnExit
      >
        {data ? (
          <CardContent>
            <div className={classes.baseStats}>
              <div>Base Stats</div>
              <table>
                <tbody>
                  {data.stats.map((item: any, i: number) => (
                    <tr key={i}>
                      <td>{item.stat.name}</td>
                      <td>{item.base_stat}</td>
                      <td>
                        <span
                          className={
                            item.base_stat > 75 ? classes.greenGraphLine : ""
                          }
                          style={{ width: `${item.base_stat}%` }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>Pokedex data</div>
            <div>
              <p>Height: {data.height}</p>
              <p>Weight: {data.weight}</p>
              <p>Species: {data.species}</p>
              {data.types.map((item: any, i: number) => (
                <p key={i}>Type: {item}</p>
              ))}
              {data.abilities.map((item: any, i: number) => (
                <p key={i}>
                  Abilitie: {item.ability.name}{" "}
                  {item.is_hidden ? "hidden" : "not"}
                </p>
              ))}
            </div>
          </CardContent>
        ) : (
          <CircularProgress />
        )}
      </Collapse>
    </Card>
  );
}

export default PokemonCard;
