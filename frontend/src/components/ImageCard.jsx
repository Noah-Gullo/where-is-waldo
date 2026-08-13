import { useNavigate } from "react-router-dom"
 
function ImageCard({file, name}) {
  const navigate = useNavigate();

  function handleClick(){
    navigate(`/${name}`);
  }

  return (
    <>
      <div class="imageCard">
        <h2>{name}</h2>
        <img className="displayImage" src={file} width="350em" height="350em" onClick={handleClick}/>
      </div>
    </>
  )
}

export default ImageCard;
