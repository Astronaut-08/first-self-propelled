import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import AboutUs from './components/AboutUs/AboutUs'
import Question from './components/Question/Question'
import JoinUs from './components/JoinUs/JoinUs'
import HelpSection from './components/HelpSection/HelpSection'
import AdminPanel from './components/AdminPanel/AdminPanel'
import Footer from './components/Footer/Footer'
import Toaster from 'react-hot-toast'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <div>
            <div><Toaster 
            position='top-center'
            reverseOrder={false}/></div>

            <Header />
            
            <section id='main'>
              <Hero />
            </section>

            <section id='about'>
              <AboutUs />
            </section>

            <Question />

            <section id='form'>
              <JoinUs />
            </section>

            <HelpSection />

            <Footer />
          </div>
        } />

        <Route path='/admin/*' element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
