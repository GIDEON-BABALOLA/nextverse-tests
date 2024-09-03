
import './App.css'
import { Route, Routes } from "react-router-dom";
import SubscribePage from './SubscribePage'
import { Navigate } from "react-router-dom"
import WaitingListPage from "./WaitingListPage"
import NotFound from "./NotFound.jsx"
import { useState } from 'react';
function App() {
  const [admin, setAdmin] = useState("")
  return (
    <>
    <Routes>
        <Route path="/">
<Route index element={<SubscribePage setAdmin={setAdmin}  />} />
<Route path='waiting-list' element={ admin === true ? <WaitingListPage /> : <Navigate to={"/"} />} />
  </Route>
  <Route  path="*" element={<NotFound/>}/>
  </Routes>
    </>
  )
}

export default App
