import { useContext } from "react";
import { CompareContext } from "./CompareContext";

export const useCompare = () => useContext(CompareContext);
