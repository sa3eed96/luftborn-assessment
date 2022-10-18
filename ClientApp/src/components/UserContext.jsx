import { createContext } from "react";

export default createContext({
  isAuthenticated: false,
  name: null,
  email: null,
});
