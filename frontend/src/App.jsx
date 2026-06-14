import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import AboutUs from './components/AboutUs/AboutUs'
import Question from './components/Question/Question'
import JoinUs from './components/JoinUs/JoinUs'

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

      <section id='form'>
        <JoinUs />
      </section>
    </div>
  )
}

export default App
