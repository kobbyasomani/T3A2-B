import { createContext, useContext } from "react";

export const GlobalStateContext = createContext();
/**
 * 
 * @returns The current global state context value object.
 */
export const useGlobalState = () => useContext(GlobalStateContext);