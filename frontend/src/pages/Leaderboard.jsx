import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Leaderboard() {
  const { board } = useParams();
  const [times, setTimes] = useState([]);

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

  function formatDate(timestamp) {
    return new Date(timestamp).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  useEffect(() => {
    async function getLeaderboard() {
      try {
        const response = await fetch(
          `http://localhost:3000/leaderboard/${board}`
        );

        if (!response.ok) {
          throw new Error("Failed to get leaderboard");
        }

        const data = await response.json();

        setTimes(data);
      } catch (error) {
        console.error(error);
      }
    }

    getLeaderboard();
  }, [board]);

  return (
    <div>
      <h1>{board} Leaderboard</h1>

      {times.length == 0 ? (
        <p>No submitted times yet.</p>
      ) : (
        <div className="leaderboardPage">
          <table id="leaderboard">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Time</th>
                <th>Submitted On</th>
              </tr>
            </thead>

            <tbody>
              {times.map((time, index) => (
                <tr key={time.id}>
                  <td>{index + 1}</td>
                  <td>{time.name}</td>
                  <td>{formatTime(time.timeMs)}</td>
                  <td>{formatDate(time.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default Leaderboard;