import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import Dropdown from "../components/Dropdown"
import Result from "../components/Result"


function WaldoPage({ file, characterNames }) {
  const [popup, setPopup] = useState({ visible: false, x: 0, y: 0 })
  const [markers, setMarkers] = useState([]);
  const [remainingNames, setRemainingNames] = useState(characterNames);
  const [completionTime, setCompletionTime] = useState(null);

  const game = location.pathname.slice(1);

  async function startGame() {
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await fetch(`${API_URL}/game`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          game,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to start game");
      }

      const data = await response.json();

      localStorage.setItem("gameToken", data.token);
    } catch (error) {
      console.error(error);
    }
  }

  async function finishGame() {
    try {
      const token = localStorage.getItem("gameToken");

      const API_URL = import.meta.env.VITE_API_URL;
      const response = await fetch(`${API_URL}}/game/finish`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to finish game");
      }

      const data = await response.json();
      sessionStorage.setItem("resultToken", data.resultToken);

      setCompletionTime(data.durationMs);

    } catch (error) {
      console.error(error);
    }
  }

  const handleClick = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setPopup({ visible: !popup.visible, x: x, y: y });
  }

  const handleSelectResult = ({ x, y, isValid, name }) => {
    setMarkers((prev) => [...prev, { x, y, isValid }]);
    
    if (isValid) {
      setRemainingNames((prev) => prev.filter((n) => n !== name));
    }
    
    setPopup({ visible: false, x: 0, y: 0 });
  }

  useEffect(() => {
      localStorage.removeItem("gameToken");
      startGame();
  }, []);

  useEffect(() => {
    if (remainingNames.length === 0) {
      finishGame();
    }
  }, [remainingNames]);

  return (
    <>
     {completionTime !== null && (
        <Result time={completionTime}></Result>
      )}
    <div style={{ position: 'relative', display: 'inline-block' }}> 
     
      <img className="imageGame" src={file} width="1475px" height="1000px" onClick={handleClick} alt="Game Board" />
      
      {popup.visible &&
        <Dropdown 
          x={popup.x} 
          y={popup.y} 
          names={remainingNames} 
          handleSelectResult={handleSelectResult} 
        />
      }

      <div id="markerContainer">
        {markers.map((m, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: `${m.x}px`,
              top: `${m.y}px`,
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              border: `3px solid ${m.isValid ? 'green' : 'red'}`,
              backgroundColor: m.isValid ? 'rgba(0, 255, 0, 0.3)' : 'rgba(255, 0, 0, 0.3)',
              pointerEvents: 'none', 
            }}
          />
        ))}
      </div>
      
      <Link to="/">Back to Home</Link>
    </div>
    </>
  )
}

export default WaldoPage;
