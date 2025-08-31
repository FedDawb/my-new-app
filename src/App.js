import React from "react";
import Weather from "./Weather";
import "./styles.css";

function App() {
  return (
    <div className="weather-app">
      <header>
        <h1>Weather App</h1>
      </header>
      <main>
        <Weather />
      </main>
      <footer>
        Built by{" "}
        <a href="https://github.com/FedDawb" target="_blank" rel="noreferrer">
          Dawn Hughes
        </a>{" "}
        - hosted{" "}
        <a
          href="https://app.netlify.com/sites/fedawbweatherapp/overview"
          target="_blank"
          rel="noreferrer"
        >
          Netlify
        </a>{" "}
        code hosted{" "}
        <a
          href="https://github.com/FedDawb/my-new-app"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>
      </footer>
    </div>
  );
}

export default App;
