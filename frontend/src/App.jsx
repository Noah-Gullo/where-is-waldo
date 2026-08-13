import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from "./pages/Dashboard"
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
        <Route path="/sea" element={<WaldoPage file={WaldoSea}/>} />
        <Route path="/dinosaurs" element={<WaldoPage file={WaldoDino}/>} />
        <Route path="/toys" element={<WaldoPage  file={WaldoToys}/>} />
      </Routes>
    </>
  )
}

export default App
