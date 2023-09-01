import "./App.css";
import { useEffect, useState } from "react";
import {
  deleteJoke,
  getAllJokes,
  postNewJokes,
  updateJoke,
} from "./services/jokeService";

export const App = () => {
  const refreshJokes = () => {
    getAllJokes().then((jokeArr) => {
      setAllJokes(jokeArr);
    }); //*Remember this function, can run it anytime to "rerender (see toggleJokeButton)"
  };
  const [allJokes, setAllJokes] = useState([]);
  const [oneLinerInput, setOneLinerInput] = useState("");
  const [untoldJokes, setUntoldJokes] = useState([]);
  const [toldJokes, setToldJokes] = useState([]);
  const [untoldNumber, setUntoldNumber] = useState(0);
  const [toldNumber, setToldNumber] = useState(0);

  const handleAddJokeButton = () => {
    postNewJokes(oneLinerInput); //*imported POST function
    setOneLinerInput(""); //*resets input field after click
  };

  const handleToggleJokeButtons = (joke) => {
    joke.told = !joke.told;
    updateJoke(joke).then(() => refreshJokes());
  };

  const handleDeleteButton = (joke) => {
    deleteJoke(joke).then(() => refreshJokes());
  };
  useEffect(() => {
    getAllJokes().then((jokesArray) => {
      setAllJokes(jokesArray);
    });
  }, [oneLinerInput]); //*For now this works because its watching anytime I input something

  useEffect(() => {
    const toldJokeList = allJokes.filter((jokes) => jokes.told === true);
    setToldJokes(toldJokeList);

    const untoldJokeList = allJokes.filter((jokes) => jokes.told === false);
    setUntoldJokes(untoldJokeList);

    const untoldNumber = allJokes.filter((jokes) => jokes.told === false);
    setUntoldNumber(untoldNumber.length);

    const toldNumber = allJokes.filter((jokes) => jokes.told === true);
    setToldNumber(toldNumber.length);
  }, [allJokes]);

  return (
    <div className="app-container">
      <div className="app-heading">
        <h1 className="app-heading-text">Chuckle Checklist</h1>
      </div>

      <div className="h2">Add Joke</div>
      <div className="joke-add-form">
        <input
          className="joke-input"
          type="text"
          placeholder="New One Liner"
          value={oneLinerInput}
          onChange={(c) => {
            setOneLinerInput(c.target.value);
          }}
        />

        <button className="joke-input-submit" onClick={handleAddJokeButton}>
          ADD
        </button>
      </div>

      <h2 className="h2">
        Untold <span className="untold-count">{untoldNumber}</span>
      </h2>

      {untoldJokes.map((untold) => {
        return (
          <div className="joke-list-container" key={untold.id}>
            <li className="joke-list-item">
              <p className="joke-list-item-text"> {untold.text}</p>
            </li>

            <button onClick={() => handleToggleJokeButtons(untold)}>
              Toggle
            </button>
            <button onClick={() => handleDeleteButton(untold)}>Delete</button>
          </div>
        );
      })}

      <h2 className="h2">
        Told <span className="told-count">{toldNumber}</span>
      </h2>
      {toldJokes.map((told) => {
        return (
          <div className="joke-list-container" key={told.id}>
            <li className="joke-list-item">
              <p className="joke-list-item-text"> {told.text}</p>
            </li>
            <button onClick={() => handleToggleJokeButtons(told)}>
              Toggle
            </button>
            <button onClick={() => handleDeleteButton(told)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
};
