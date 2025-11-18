import Navbar from '../components/Navbar';
import About from "../components/About"
import Contact from "../components/Contact"
import Footer from "../components/Footer"
import Hero from "../components/Hero"
import Projects from "../components/Projects"
import Experience from './../components/Experience';
import Skills from './../components/Skills';
import Education from './../components/Education';
const Home = () => {
  return (
    <>
      <Navbar />
      <main className="container mx-auto">
        <Hero />
        <About />
        <Skills />
        <Education />
        <Projects />
        <Experience />
        <Contact />

      </main>
      <Footer />
    </>
  )
}

export default Home