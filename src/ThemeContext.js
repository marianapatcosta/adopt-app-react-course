import { createContext } from "react";

 /* returns an object with two React components in it: a Provider and a Consumer. 
A Provider is how you scope where a context goes. 
A context will only be available inside of the Provider. You only need to do this once.
A Consumer is how you consume from the above provider. 
A Consumer accepts a function as a child and gives it the context which you can use. 
We won't be using the Consumer directly: a function called useContext will do that for us. */
const ThemeContext = createContext(["green", () => {}]);

export default ThemeContext;