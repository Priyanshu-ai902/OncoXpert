import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'


const App = () => {
  return (
    <div className="relative flex min-h-screen flex-row bg-black p-4 ">
      <div className="relative mr-10 hidden sm:flex">

      </div>

      <div className="mx-auto max-w-[1280px] flex-1 max-sm:w-full sm:pr-5">
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
        </Routes>
      </div>
    </div>
  )
}

export default App;