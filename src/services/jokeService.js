export const getAllJokes = () => {
  return fetch("http://localhost:8088/jokes").then((res) => res.json());
};

export const postNewJokes = (input) => {
  fetch("http://localhost:8088/jokes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: input,
      told: false,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      // Handle the response data
      console.log(data);
    })
    .catch((error) => {
      // Handle any errors
      console.error(error);
    });
};

export const updateJoke = (joke) => {
  return fetch(`http://localhost:8088/jokes/${joke.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(joke),
  })
    .then((res) => res.json())
    .then((data) => {
      // Handle the response data
      console.log(data);
    })
    .catch((error) => {
      // Handle any errors
      console.error(error);
    });
};

export const deleteJoke = (joke) => {
  return fetch(`http://localhost:8088/jokes/${joke.id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      // Handle the response data
      console.log(data);
    })
    .catch((error) => {
      // Handle any errors
      console.error(error);
    });
};
