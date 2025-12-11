import { Routes, Route, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { lazy, useEffect, useState } from 'react'
import MenuContainer from '../Components/MenuContainer/MenuContainer'
import TileContainer from '../Components/TilesContainer/TileContainer'
import TextSlider from '../Components/TextSlider/TextSlider'
import menuManagement from '../Stores/menuManagement'

const HomePage = lazy(() => import("../Pages/HomePage/HomePage"))
const AboutPage = lazy(() => import("../Pages/AboutPage/AboutPage"))
const WorkPage = lazy(() => import("../Pages/WorkPage/WorkPage"))

function App() {
  const location = useLocation()
  const path = location.pathname
  const { isOpened, changeMenuState } = menuManagement()
  const [windowWidth, setWindowWidth] = useState()

  useEffect(() => {
    setWindowWidth(window.innerWidth)
  }, [])

  window.addEventListener('resize', () => setWindowWidth(window.innerWidth))

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8,
      smoothWheel: true,
      smoothTouch: true,
      wheelMultiplier: 3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    })

    const cards = document.querySelectorAll(".service-container")

    const raf = (time) => {
      lenis.raf(time)

      const vh = window.innerHeight

      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect()

        const start = vh * 1.5
        const end = vh * 0.5

        let progress = (start - rect.top) / (start - end)
        progress = Math.min(Math.max(progress, 0), 1)

        const translateY = 150 * (1 - progress) * ((index + 1) * 0.5)

        card.style.transform = `translateY(${translateY}px)`
      })

      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return <>
    <MenuContainer />
    <div className={`menu-button s-fs ${isOpened ? "opened" : ""} ${path === "/" ? "home-page-style" : ""}`} onClick={() => changeMenuState()}>
      <span>[</span>
      <TextSlider
        size={"s-h"}
        classGiven={"m-ffb"}
        firstTextLayer={"menu"}
        secondTextLayer={"menu"}
      />
      <span>]</span>
    </div>
    <TileContainer tileNumber={windowWidth < 600 ? 2 : 3} />
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/about" element={<AboutPage />}></Route>
      <Route path="/work" element={<WorkPage />}></Route>
    </Routes>
  </>
}

export default App
