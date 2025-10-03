import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [msg, setMsg] = useState("")

  useEffect(() => {
    fetch("/api/v1/hello")
      .then(res => res.json())
      .then(data => setMsg(data.message))
  }, []);

  return (
    <>
      {msg}
    </>
  )
}

export default App
