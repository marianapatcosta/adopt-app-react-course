import React, { useState, lazy, Suspense } from "react";
import { render } from "react-dom";
//import SearchParams from "./SearchParams";
import Pet from "./Pet";
import { Router, Link } from "@reach/router";
//import Details from "./Details";
import NavBar from "./NavBar";
import ThemeContext from "./ThemeContext";

//Dynamically lazely imports Details when Details component needs to be loaded for the 1st time
const Details = lazy(() => import("./Details"));
const SearchParams = lazy(() => import("./SearchParams"));

const App = () => {
  //At global level, we are setting theme to darkBlue;  we can have an object
  const themeHook = useState("darkBlue");
  //const themeHook = useState({buttonColor: "darkBlue", modalColor: "green"});

  return (
    <React.StrictMode>
      {/* all the app, by wrapping it with themeContext React notifies the 
    higher components to re-render whenever our context changes*/}
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
          {/* <Pet name="Luna" animal="Dog" breed="Havanese" />
        <Pet name="Peppa" animal="Pig" breed="Cartoon" />
        <Pet name="Garfield" animal="Cat" breed="Comics" /> */}

          {/* fallback will show if code inside Suspense is not ready yet;
        Suspense says to not show anything inside of it (show fallback instead) until
        the promise import() resolves and then shows its content */}
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

/* // function component, which returns markup (what React.createElement generates) 
const App = () => {
  // React.createElement() creates one instance of some component/class
  return React.createElement(
    "div", // type of element
    {}, // {} or null; all the attributes (PROPS) that will be passed into the child element (like id or style.), in this case the div
    [
      React.createElement("h1", {}, "Adopt Me!"), //the child or array of children that is passed in to div is React.createElement('h1', {}, 'Adopt Me!')
      React.createElement(Pet, {
        name: "Luna",
        animal: "Dog",
        breed: "Havanese"
      }), // this component has no children
      //React.createElement(Pet), // this component has no attributes nor children
      React.createElement(Pet, {
        name: "Peppa",
        animal: "Pig",
        breed: "Cartoon"
      }),
      React.createElement(Pet, {
        name: "Garfield",
        animal: "Cat",
        breed: "Comics"
      })
    ]
  );
}; */

//ReactDOM.render(React.createElement(App), document.getElementById("root"));
//render(React.createElement(App), document.getElementById("root"));

render(<App />, document.getElementById("root"));

//To import APP to node
//export default App;

