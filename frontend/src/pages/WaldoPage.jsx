import { useState } from "react"
import { Link } from "react-router-dom"
import Dropdown from "../components/Dropdown"

function WaldoPage({file, characterNames}) {
  const [popup, setPopup] = useState({visible: false, x: 0, y: 0})
  const handleClick = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setPopup({visible: !popup.visible, x: x, y: y});
  }

  return (
    <>
        <div style={{ position: 'relative', display: 'inline-block' }}> 
          <img className="imageGame" src={file} width="1475px" height="1000px" onClick={handleClick}/>
          {popup.visible &&
            <Dropdown x={popup.x} y={[popup.y]} names={characterNames}></Dropdown>
          }
        </div>
        <Link to="/">Back to Home</Link>
    </>
  )
}

export default WaldoPage
