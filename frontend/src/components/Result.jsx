import { useState } from "react";
import { Link } from "react-router-dom";

function Result({ time }) {
  const [name, setName] = useState("");

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

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <div className="resultOverlay">
            <div className="resultContainer">
                <h2>You finished!</h2>

                <p>Time: {formatTime(time)}</p>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">
                        Name:
                    </label>

                    <input id="name" type="text" value={name}onChange={(event) => setName(event.target.value)} required/>

                    <button type="submit">
                        Submit to Leaderboard
                    </button>
                </form>

                <Link to="/" onClick={() => localStorage.removeItem("gameToken")}> Back Home </Link>
            </div>
        </div>
    );
}

export default Result;