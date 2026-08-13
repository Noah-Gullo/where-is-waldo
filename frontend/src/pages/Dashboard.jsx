import ImageCard from "../components/ImageCard"
import WaldoSea from "../assets/waldo-deep-sea.jpg"
import WaldoDino from "../assets/waldo-dinosaurs.jpg"
import WaldoToys from "../assets/waldo-toys.jpg"

function Dashboard() {
  return (
    <>
        <h1>Where's Waldo</h1>
        <div className="imageCardContainer">
          <ImageCard file={WaldoSea} name="Sea"></ImageCard>
          <ImageCard file={WaldoDino} name="Dinosaurs"></ImageCard>
          <ImageCard file={WaldoToys} name="Toys"></ImageCard>
        </div>
    </>
  )
}

export default Dashboard
