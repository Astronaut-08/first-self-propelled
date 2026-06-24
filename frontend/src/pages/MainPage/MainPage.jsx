import Header from '../../components/Header/Header'
import Hero from '../../components/Hero/Hero'
import AboutUs from '../../components/AboutUs/AboutUs'
import Question from '../../components/Question/Question'
import JoinUs from '../../components/JoinUs/JoinUs'
import HelpSection from '../../components/HelpSection/HelpSection'
import Footer from '../../components/Footer/Footer'
import { Toaster } from 'react-hot-toast'

const MainPage = () => {
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

        <HelpSection />

        <Footer />

        <Toaster position='top-center' />
    </div>
  )
}

export default MainPage
