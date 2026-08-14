import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Leaderboard() {
  const { board } = useParams();
  const [scores, setScores] = useState([]);

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

        setScores(data);
      } catch (error) {
        console.error(error);
      }
    }

    getLeaderboard();
  }, [board]);

  return (
    <div>
      <h1>{board} Leaderboard</h1>

      {scores.map((score) => (
        <p key={score.id}>
          {score.name}: {score.timeMs}ms
        </p>
      ))}

      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default Leaderboard;