import ImageCard from "../components/ImageCard"
import WaldoSea from "../assets/waldo-deep-sea.jpg"
import WaldoDino from "../assets/waldo-dinosaurs.jpg"
import WaldoToys from "../assets/waldo-toys.jpg"

function Dashboard() {
  return (
    <>
        <h1>Where's Waldo</h1>
        <ImageCard file={WaldoSea} name="sea"></ImageCard>
        <ImageCard file={WaldoDino} name="dinosaurs"></ImageCard>
        <ImageCard file={WaldoToys} name="toys"></ImageCard>
    </>
  )
}

export default Dashboard
