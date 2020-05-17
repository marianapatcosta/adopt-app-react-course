import React, { useState, lazy, Suspense } from "react";
import { render } from "react-dom";
import Pet from "./Pet";
import { Router, Link } from "@reach/router";
import NavBar from "./NavBar";
import ThemeContext from "./ThemeContext";

const Details = lazy(() => import("./Details"));
const SearchParams = lazy(() => import("./SearchParams"));

const App = () => {
  const themeHook = useState("darkBlue");

  return (
    <React.StrictMode>
      <ThemeContext.Provider value={themeHook}>
        <div>
          {/* <NavBar/> */}
          {
            <header>
              <Link to="/">
                <h1>Adopt Me!</h1>
              </Link>
            </header>
          }
         
          <Suspense fallback={<h1>Loading route …</h1>}>
            <Router>
              <SearchParams path="/" />
              <Details path="/details/:id" />
            </Router>
          </Suspense>
        </div>
      </ThemeContext.Provider>
    </React.StrictMode>
  );
};

render(<App />, document.getElementById("root"));

