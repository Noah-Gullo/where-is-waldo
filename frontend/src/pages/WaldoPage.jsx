import { useState } from "react"
import { Link } from "react-router-dom"
import Dropdown from "../components/Dropdown"

function WaldoPage({ file, characterNames }) {
  const [popup, setPopup] = useState({ visible: false, x: 0, y: 0 })
  const [markers, setMarkers] = useState([]);
  // Track remaining available names in parent state
  const [remainingNames, setRemainingNames] = useState(characterNames);

  const handleClick = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setPopup({ visible: !popup.visible, x: x, y: y });
  }

  const handleSelectResult = ({ x, y, isValid, name }) => {
    setMarkers((prev) => [...prev, { x, y, isValid }]);
    
    if (isValid) {
      // Remove the successfully found character from the available list
      setRemainingNames((prev) => prev.filter((n) => n !== name));
    }
    
    setPopup({ visible: false, x: 0, y: 0 });
  }

  return (
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
              left: `${m.x - 15}px`,
              top: `${m.y - 15}px`,
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
      
      <br />
      <Link to="/">Back to Home</Link>
    </div>
  )
}

export default WaldoPage;
