import { ActionType } from "./type";

export interface IState {
  pokemons?: any[];
  pokemonTypes?: any[];
}

export interface IAction {
  type: ActionType;
  payload: IState;
}

const initialState: IState = { pokemons: [], pokemonTypes: [] };

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case ActionType.ADD_POKEMONS:
      return {
        ...state,
        pokemons: action.payload.pokemons,
        pokemonTypes: action.payload.pokemonTypes
      };
    case ActionType.UPDATE_POKEMONS:
      return { ...state, pokemons: action.payload.pokemons };
    case ActionType.ADD_POKEMON_TYPES:
      return { ...state, pokemonTypes: action.payload.pokemonTypes };
    default:
      throw new Error();
  }
};

export { reducer, initialState };
