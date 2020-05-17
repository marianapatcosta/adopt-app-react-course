//Will take the code that really needs to run on browser/client side; 
//the rest of the code will be server-side rendered (SSR)

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// any other browser only code


// Use hydrate instead of render (), because it will hydrate existing markup rather than render it from scratch.
ReactDOM.hydrate(<App />, document.getElementById("root"));