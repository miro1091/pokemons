import React, { useReducer, useEffect } from "react";
import axios from "axios";
import uuid from "uuidv4";
import CircularProgress from "@material-ui/core/CircularProgress";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import { ActionType } from "./reducer/type";
import { reducer, initialState, IState, IAction } from "./reducer/reducer";
import Context from "./reducer/Context";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Content from "./components/layout/Content";
import useStyles from "./app.style";

const App = () => {
  const classes = useStyles();
  const [state, dispatch] = useReducer<React.Reducer<IState, IAction>>(
    reducer,
    initialState
  );

  const history = createBrowserHistory();

  useEffect(() => {
    axios.get("pokemon").then(response => {
      axios
        .all(response.data.results.map((item: any) => axios.get(item.url)))
        .then(
          axios.spread((...res) => {
            console.log("res:", res);

            const customPokemons: any[] = [];
            let customPokemonTypes: any[] = [];

            res.map((item: any) => {
              const types = item.data.types.map((type: any) => type.type.name);
              customPokemonTypes.push(...types);

              customPokemons.push({
                id: uuid(),
                pokemon_id: item.data.id,
                name: item.data.name,
                height: item.data.height,
                weight: item.data.weight,
                abilities: item.data.abilities,
                species: item.data.species.name,
                stats: item.data.stats,
                types: types,
                sprite: item.data.sprites.front_shiny
              });
            });
            dispatch({
              type: ActionType.ADD_POKEMONS,
              payload: {
                pokemons: customPokemons,
                pokemonTypes: customPokemonTypes.filter(
                  (v, i) => customPokemonTypes.indexOf(v) === i
                )
              }
            });
          })
        );
    });
  }, []);

  return (
    <Router>
      <Context.Provider value={{ state, dispatch }}>
        <div className={classes.app}>
          {state.pokemons && state.pokemons.length > 0 ? (
            <>
              <Route component={Header} />
              <Route exact path="/" component={Content} />
              <Route path="/evolution/:pokemon_id" component={Evolution} />
              <Footer />
            </>
          ) : (
            <CircularProgress size={200} />
          )}
        </div>
      </Context.Provider>
    </Router>
  );
};

function Evolution({ match }: { match: any }) {
  return (
    <div style={{ paddingTop: "70px" }}>
      <h2>Evolution: {match.params.pokemon_id}</h2>
    </div>
  );
}

export default App;
