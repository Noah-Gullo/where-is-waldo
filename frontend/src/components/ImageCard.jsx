import { useNavigate } from "react-router-dom"
 
function ImageCard({file, name}) {
  const navigate = useNavigate();

  function handleClick(){
    navigate(`/${name}`);
  }

  function handleLeaderboard(){
    navigate(`/leaderboard/${name}`)
  }

  return (
    <>
      <div className="imageCard">
        <h2>{name}</h2>
        <img className="displayImage" src={file} width="350em" height="350em" onClick={handleClick}/>
        <button onClick={handleLeaderboard}>View Leaderboard</button>
      </div>
    </>
  )
}

export default ImageCard;
