import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import AboutUs from './components/AboutUs/AboutUs'

const App = () => {
  return (
    <div>
      <Header />
      <Hero />
      <AboutUs />
    </div>
  )
}

export default App
