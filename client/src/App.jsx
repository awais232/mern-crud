import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Users from './Components/Users'
import CreateUser from './Components/CreateUser'
import UpdateUser from './Components/UpdateUser'
import User from './Components/User'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Users />} />
            <Route path='/create' element={<CreateUser />} />
            <Route path='/update/:id' element={<UpdateUser />} />
            <Route path='/user/:id' element={<User />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
