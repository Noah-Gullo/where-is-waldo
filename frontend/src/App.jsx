import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from "./pages/Dashboard"
import Leaderboard from "./pages/Leaderboard"
import WaldoPage from "./pages/WaldoPage"
import WaldoSea from "./assets/waldo-deep-sea.jpg"
import WaldoDino from "./assets/waldo-dinosaurs.jpg"
import WaldoToys from "./assets/waldo-toys.jpg"
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/sea" element={<WaldoPage file={WaldoSea} characterNames={["Waldo", "Octopus", "Swordfish"]}/>} />
        <Route path="/dinosaurs" element={<WaldoPage file={WaldoDino} characterNames={["Waldo", "Fly on a Plate", "Mimic Chest"]}/>} />
        <Route path="/toys" element={<WaldoPage  file={WaldoToys} characterNames={["Waldo", "Clock Man", "Elephant"]}/>} />
        <Route path="/leaderboard/:board" element={<Leaderboard />} />
      </Routes>
    </>
  )
}

export default App
