import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Result({ time }) {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const ms = milliseconds % 1000;

    return `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}.${ms
      .toString()
      .padStart(3, "0")}`;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const resultToken = sessionStorage.getItem("resultToken");

      if (!resultToken) {
        throw new Error("No result token found");
      }
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await fetch(`${API_URL}/leaderboard`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          resultToken,
        }),
      });

      const data = await response.json();
      sessionStorage.removeItem("resultToken");
      localStorage.removeItem("gameToken");

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit score");
      }

      navigate(`/leaderboard/${data.score.board}`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="resultOverlay">
      <div className="resultContainer">
        <h2>You finished!</h2>

        <p>Time: {formatTime(time)}</p>

        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">
              Name
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              required
            />

            <button type="submit">
              Submit to Leaderboard
            </button>
          </form>
        ) : (
          <p>Score submitted!</p>
        )}

        <Link
          to="/"
          onClick={() => {
            localStorage.removeItem("gameToken");
            sessionStorage.removeItem("resultToken");
          }}
        >
          Back Home
        </Link>
      </div>
    </div>
  );
}

export default Result;