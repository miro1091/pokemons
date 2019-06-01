import React, { useState, useEffect } from "react";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import ArrowRightAlt from "@material-ui/icons/ArrowRightAlt";
import useStyles from "./evolution.style";

const Evolution = ({ match }: { match: any }) => {
  const classes = useStyles();
  const [evolution, setEvolution] = useState([] as any);

  useEffect(() => {
    axios.get(`evolution-chain/${match.params.pokemon_id}`).then(res => {
      let tempEvol = [];
      let evolData = res.data.chain;

      tempEvol.push([
        {
          species_name: evolData.species.name
        }
      ]);

      do {
        let numberOfEvolutions = evolData["evolves_to"].length;
        let tempEvolArr = [];

        if (numberOfEvolutions > 0) {
          for (let i = 0; i < numberOfEvolutions; i++) {
            tempEvolArr.push({
              species_name: evolData.evolves_to[i].species.name
            });
          }
        }

        if (tempEvolArr.length > 0) {
          tempEvol.push(tempEvolArr);
        }

        evolData = evolData["evolves_to"][0];
      } while (evolData && evolData.hasOwnProperty("evolves_to"));

      Promise.all(
        tempEvol.map(i =>
          axios.all(i.map(c => axios.get(`pokemon/${c.species_name}`)))
        )
      ).then(data => {
        setEvolution(data);
      });
    });
  }, []);

  if (evolution) {
    console.log("evolution:", evolution);
  }

  return (
    <div className={classes.evolutionWrapper}>
      {evolution.length > 0 ? (
        <div className={classes.evolutionFlow}>
          {evolution.map((it: any, i: number) => (
            <>
              <div key={i}>
                {it.map((item: any, i: number) => (
                  <div className={classes.evolutionFlowItem} key={i}>
                    <img
                      src={item.data.sprites.front_default}
                      alt={item.data.name}
                    />
                    <p>#{item.data.id.toString().padStart(3, "0")}</p>
                    <p>{item.data.name}</p>
                    <p>
                      {item.data.types.map((type: any, i: number) => (
                        <span key={i}>{type.type.name}</span>
                      ))}
                    </p>
                  </div>
                ))}
              </div>
              {evolution.length - 1 === i ? null : (
                <div>
                  <ArrowRightAlt />
                </div>
              )}
            </>
          ))}
        </div>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default Evolution;
