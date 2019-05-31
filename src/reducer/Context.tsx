import React from "react";
import { IState, IAction } from "./reducer";

interface IContextProps {
  state: IState;
  dispatch: React.Dispatch<IAction>;
}

const Context = React.createContext({} as IContextProps);

export default Context;
