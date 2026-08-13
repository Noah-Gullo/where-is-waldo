import { Link } from "react-router-dom"
function WaldoPage({file,}) {
  return (
    <>
        <img src={file} width="200px" height="200px"/>
        <Link to="/">Back to Home</Link>
    </>
  )
}

export default WaldoPage
