import { useContext } from "react";
import  ButtonContext  from "./provider.jsx";

export const useButton = () => useContext(ButtonContext);