import { useNavigate } from "react-router-dom"
 
function ImageCard({file, name}) {
  const navigate = useNavigate();

  function handleClick(){
    navigate(`/${name}`);
  }

  return (
    <>
      <img src={file} width="350em" height="350em" onClick={handleClick}/>
    </>
  )
}

export default ImageCard;
