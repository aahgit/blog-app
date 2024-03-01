import React, { useEffect } from 'react'
import { Route, Routes } from "react-router-dom"

import { Home, Login, Register, AuthLayout, NavBar, Profile, UploadForm, LargePost, EditPost, Search, Settings } from './components'

import "./App.css"


const App = () => {



  return (
    <div>

      <Routes>
        <Route element={<NavBar />}>
          <Route path='/' element={<AuthLayout authentication={true}><Home /></AuthLayout>} />
          <Route path='/profile/' element={<AuthLayout authentication={true}><Profile /></AuthLayout>} />
          <Route path='/upload' element={<AuthLayout authentication={true}><UploadForm /></AuthLayout>} />
          <Route path='/search' element={<AuthLayout authentication={true}><Search /></AuthLayout>} />
          <Route path='/settings' element={<AuthLayout authentication={true}><Settings /></AuthLayout>} />
          <Route path='/post/:slug' element={<AuthLayout authentication={true}><LargePost /></AuthLayout>} />
          <Route path='/edit-post/:ParamsSlug' element={<AuthLayout authentication={true}><EditPost /></AuthLayout>} />
          <Route path='/profile/:slug' element={<AuthLayout authentication={true}><Profile /></AuthLayout>} />

        </Route>

        <Route path='/login' element={<AuthLayout authentication={false}><Login /></AuthLayout>} />
        <Route path='/register' element={<AuthLayout authentication={false}><Register /></AuthLayout>} />
      </Routes>



    </div>
  )
}

export default App
