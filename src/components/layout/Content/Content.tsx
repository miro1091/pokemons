import React, { useState, useEffect, useContext } from "react";
import Context from "../../../reducer/Context";
import PokemonCard from "../../ui/PokemonCard";
import { PokemonCardProps } from "../../ui/PokemonCard/PokemonCard";
import useStyles from "./content.style";

const Content = () => {
  const classes = useStyles();
  const [pokemons, setPokemons] = useState<any>([]);

  const context = useContext(Context);

  useEffect(() => {
    setPokemons(context.state.pokemons);
  }, [context.state.pokemons]);

  return (
    <div className={classes.cardWrapper}>
      {pokemons &&
        pokemons.map((item: any) => <PokemonCard key={item.id} data={item} />)}
    </div>
  );
};

export default Content;
