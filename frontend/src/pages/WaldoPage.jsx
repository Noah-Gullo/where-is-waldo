import { Link } from "react-router-dom"
function WaldoPage({file,}) {
  return (
    <>
        <img className="imageGame" src={file} width="1475px" height="1000px"/>
        <Link to="/">Back to Home</Link>
    </>
  )
}

export default WaldoPage
