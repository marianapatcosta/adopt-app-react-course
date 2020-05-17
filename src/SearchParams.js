import React, { useState, useEffect, useContext } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet"; // parcels does npm install @frontendmasters/pet
import useDropdown from "./useDropdown";
import Results from "./Results";
import ThemeContext from "./ThemeContext";

const SearchParams = () => {
  {
    /*   useState adds React state to function components; returns the current state (location) and a function to update it
     (setLocation, which takes the new state as argument); useState takes as argument the initial state value 
     
     useEffect replaces lifecycle methods; is only triggered after everything is rendered; it does not run at 1st render
     it is only called after 1st render
     */
  }

  const [location, setLocation] = useState("Seattle, WA");
  const [breeds, setBreeds] = useState([]);
  //const [animal, setAnimal] = useState("dog");
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  //const [breed, setBreed] = useState("");
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);
  const [pets, setPets] = useState([]);

  //get the context data out of a given context; nothing is passed to SearchParams by the parent APP
  //the child will get the context from the provider
  const [theme, setTheme] = useContext(ThemeContext);

  function requestPets() {
    pet.animals({
      location,
      breed,
      type: animal
    }). then(({animals}) => {
      setPets(animals || []);      
    });

  }

/*   async function requestPets() {
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal
    });

    setPets(animals || []);
  } */

  /*  runs every time a render is called, unless we pass the dependencies array as 2nd arg, which tells React 
  to run the effect function only if one of the dependencies as changed: 
  By adding  [animal, setBreed, setBreeds], if location changes, useEffects will not run
  */

  useEffect(() => {
    setBreeds([]);
    setBreed("");

    pet.breeds(animal).then(({ breeds }) => {
      const breedStrings = breeds.map(({ name }) => name);
      //const breedStrings = breeds.map((breed) => breed.name)
      setBreeds(breedStrings);
    }, console.error); // error => console.error(error)
    //pet.breeds('dog').then(console.log, console.error);
  }, [animal, setBreed, setBreeds]);

  // a [] as dependency means that useEffect depends on nothing and will never update again

  return (
    <div className="search-params">
      <h1>{location}</h1>
      <form
        onSubmit={e => {
          e.preventDefault(); // prevents submission as an html request form
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={event => setLocation(event.target.value)}
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        {/*  <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={e => setAnimal(e.target.value)}
            onBlur={e => setAnimal(e.target.value)}
          >
            <option>All</option>
            {ANIMALS.map(animal => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            value={breed}
            onChange={e => setBreed(e.target.value)}
            onBlur={e => setBreed(e.target.value)}
            disabled={!breeds.length}
          >
            <option>All</option>
            {breeds.map(breedString => (
              <option key="breedString" value={breedString}>
                {breedString}
              </option>
            ))}
          </select>
        </label> */}
        {/* Here we not use Dropddown Hook because it creates its own jooks and we are using here App's hooks */}
        <label htmlFor="theme">
          Theme
          <select
            value={theme}
            onChange={e => setTheme(e.target.value)}
            onBlur={e => setTheme(e.target.value)}
          >
            <option value="peru">Peru</option>
            <option value="darkblue">Dark Blue</option>
            <option value="chartreuse">Chartreuse</option>
            <option value="mediumorchid">Medium Orchid</option>
          </select>
        </label>
        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>
      <Results pets={pets}></Results>
    </div>
  );
};

export default SearchParams;
