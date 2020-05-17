import React, {lazy} from "react";
import pet from "@frontendmasters/pet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundery";
import ThemeContext from "./ThemeContext";

import { navigate } from "@reach/router";
//import Modal from "./Modal";

//we do not need to add another Suspense, it bubbles up to the Suspense placed in the root
const Modal = lazy(() => import("./Modal"));


class Details extends React.Component {
  state = { loading: true, showModel: false };
  /*   constructor(props) {
    super(props);
    //state is self-contained in the class; no other component can change it
    this.state = { loading: true };
  } */

  componentDidMount() {
    pet
      .animal(+this.props.id)
      //use arrow function to keep the context; if we use function() it creates a new context
      .then(({ animal }) => {
        //setState does like Object.assign(old, newState), like a  merge and overrides the value if the key already exists

        this.setState({
          url: animal.url,
          name: animal.name,
          animal: animal.type,
          location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
          description: animal.description,
          media: animal.photos,
          breed: animal.breeds.primary,
          loading: false
        });
      })
      .catch(err => this.setState({ error: err }));
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  adopt = () => navigate(this.state.url); 
  /* Programatic way of navigating using Reach Router. This is bad accessibility so you should be extra cautious when doing this. 
  The button should be an <a> tag  */

  render() {
    if (this.state.loading) {
      return <h1>loading … </h1>;
    }

    const { animal, breed, location, description, media, name, showModal } = this.state;

    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} — ${breed} — ${location}`}</h2>
          {/* Consumer takes a function, actually we crate a small React component inside Consumer, as its a function
        returning html pattern */}
          <ThemeContext.Consumer>
            {/*  destructuring themeHook*/}
            {([theme]) => (
              <button
                style={{ backgroundColor: theme }}
                onClick={this.toggleModal}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          ;{/*  <button>Adopt {name}</button> */}
          <p>{description}</p>          
          {
            showModal ? (
              <Modal>
                <div>
                  <h1>Would you like to adopt {name}?</h1>
                  <div className="buttons">
                    <button onClick={this.adopt}>Yes</button>
                    <button onClick={this.toggleModal}>No</button>
                  </div>
                </div>
              </Modal>
            ) : null
          }
        </div>
      </div>
    );
  }
}

/* const Details = (props) => {
    return <pre><code>{JSON.stringify(props, null, 4)}</code></pre>; //to see all the route props in the page
}; */

export default function DetailsWithErrorBoundary(props) {
  //this wraps details too allow ErrorBoundary to handle errors in the child component (Detail)
  return (
    <ErrorBoundary>
      <Details {...props} />
      {/* This spreads props here and is equivalent to have <Details id={id} number={number}/>*/}
    </ErrorBoundary>
  );
}
