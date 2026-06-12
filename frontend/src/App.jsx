import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import AboutUs from './components/AboutUs/AboutUs'
import Question from './components/Question/Question'

const App = () => {
  return (
    <div>
      <Header />
      
      <section id='main'>
        <Hero />
      </section>

      <section id='about'>
        <AboutUs />
      </section>

      <Question />
    </div>
  )
}

export default App
