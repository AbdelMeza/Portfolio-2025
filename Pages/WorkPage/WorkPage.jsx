import { useCallback, useEffect, useState } from 'react'
import navigationManagement from '../../Stores/navigationManagement'
import HomeButton from '../../Components/HomeButton/HomeButton'
import projects from '../../Database/Projects'
import './WorkPage.css'

export default function WorkPage() {
    const { endTransition } = navigationManagement()
    const [colors, setColors] = useState({})
    const [activeFilter, setActiveFilter] = useState("grid-view")
    const [isMobile, setIsMobile] = useState(window.innerWidth < 750)
    const [activeIndex, setActiveIndex] = useState(0)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isHovering, setHoveringState] = useState(false)

    const handleResize = useCallback(() => {
        const mobile = window.innerWidth < 750
        setIsMobile(mobile)

        if (mobile) {
            setActiveFilter("grid-view")
        }
    }, [])

    const trackMouse = useCallback((e) => {
        const posX = 40 + (e.clientX / window.innerWidth) * (60 - 40) //Set a range where the element will be
        const posY = (e.clientY * 100) / window.innerHeight

        setPosition({ x: posX, y: posY })
    }, [])

    async function loadColors() {
        try {
            const results = await Promise.all(projects.map(async (project) => {
                try {
                    const color = await getDominantColor(project.projectImage)
                    return color ? { [project.projectImage]: `rgb(${color.r}, ${color.g}, ${color.b})` } : null
                } catch {
                    return null
                }
            }))

            const finalColors = Object.assign({}, ...results.filter(Boolean))
            setColors(finalColors)
            endTransition()
        } catch (error) {
            console.log("Error loading colors", error)
        }
    }


    useEffect(() => {
        loadColors()
        window.addEventListener("resize", handleResize)

        return () => window.removeEventListener("resize", handleResize)
    }, [handleResize])

    useEffect(() => {
        if (activeFilter === "column-view" && isHovering) {
            window.addEventListener("mousemove", trackMouse)
        }

        return () => window.removeEventListener("mousemove", trackMouse)
    }, [activeFilter, isHovering, trackMouse])

    useEffect(() => {
        const carrousel = document.querySelector('.floating-image-carrousel')

        if (carrousel) {
            let childrens = carrousel.children

            if (childrens) {
                childrens = Array.from(childrens)

                childrens.map(el =>
                    el.style.transform = `translateY(${-100 * activeIndex}%)`
                )
            }
        }
    }, [activeIndex])

    useEffect(() => {
        const carrousel = document.querySelector('.floating-image-carrousel')

        if (carrousel) {
            carrousel.animate([
                { left: `${position.x}%`, top: `${position.y}%` },
            ], {
                duration: 800,
                fill: 'forwards',
                easing: 'ease-out'
            });

        }
    }, [position])

    return (
        <div className="work-page bgc-l">
            <HomeButton />

            <div className="content">
                <span className="m-ffr mt-dc">Creating next-level digital</span>
                <span className="m-ffr mt-dc">products and experiences</span>
            </div>
            <div className="projects-filter-container">
                {!isMobile && (
                    <div className={`filter-button grid-filter ${activeFilter === "grid-view" ? "active" : ""}`}
                        onClick={() => setActiveFilter("grid-view")}
                    >
                        <div className="squares-container">
                            <span className="square"></span>
                            <span className="square"></span>
                            <span className="square"></span>
                            <span className="square"></span>
                        </div>
                    </div>
                )}

                {!isMobile && (
                    <div className={`filter-button column-filter ${activeFilter === "column-view" ? "active" : ""}`}
                        onClick={() => setActiveFilter("column-view")}
                    >
                        <span className="line"></span>
                        <span className="line"></span>
                        <span className="line"></span>
                    </div>
                )}
            </div>

            <div className={`projects-wrapper ${activeFilter}`}>
                {projects && projects.length > 0 ? (
                    activeFilter === "grid-view" ? (
                        projects.map((project, index) => (
                            <a className="project-container" href={project.link} target="_blank" key={index}>
                                <div className="image-container" style={{ backgroundColor: colors[project.projectImage] || "#e2e2e2" }}>
                                    <img className="project-image" src={project.projectImage} alt="project" draggable="false" />
                                </div>
                                <div className="main-informations-container">
                                    <span className="project-title m-ffr mt-dc m-fs">{project.projectTitle}</span>
                                    <span className="project-client m-ffr mt-dc s-fs">{project.client}</span>
                                </div>
                                <div className="secondary-informations-container">
                                    <span className="services m-ffr st-dc s-fs">{project.services}</span>
                                    <span className="creaction-date m-ffr st-dc s-fs">{project.creactionDate}</span>
                                </div>
                            </a>
                        ))
                    ) : (
                        <>
                            <div className="floating-image-carrousel" style={{ transform: `translate(-50%, -50%) scale(${isHovering ? 1 : 0})` }}>
                                {projects.map((project, index) => (
                                    <div
                                        className="image-container"
                                        style={{ backgroundColor: colors[project.projectImage] || "#e2e2e2" }}
                                        key={index}
                                    >
                                        <img src={project.projectImage} className="project-image" alt="project-image" />
                                    </div>
                                ))}
                            </div>
                            <table className="projects-table">
                                <colgroup>
                                    <col width={"65%"}></col>
                                    <col width={"20%"} style={{ minWidth: "150px" }}></col>
                                    <col width={"20%"}></col>
                                </colgroup>
                                <thead className="column-row column-header">
                                    <tr>
                                        <th className="column-cell header-info m-ffb st-dc">Title</th>
                                        <th className="column-cell header-info m-ffb st-dc">Services</th>
                                        <th className="column-cell header-info m-ffb st-dc">client</th>
                                        <th className="column-cell align-left header-info m-ffb st-dc">Creation date</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {projects.map((project, index) => (
                                        <tr key={index}
                                            className="column-row column-project"
                                            onClick={() => project.link ? window.open(project.link, "_blank") : null}
                                            onMouseEnter={() => { setActiveIndex(index), setHoveringState(true) }}
                                            onMouseLeave={() => setHoveringState(false)}
                                            style={{ cursor: `${project.link ? "pointer" : "auto"}` }}
                                        >
                                            <td className="column-cell main-info m-ffr mt-dc m-fs">{project.projectTitle}</td>
                                            <td className="column-cell secondary-info m-ffr st-dc s-fs">{project.services}</td>
                                            <td className="column-cell secondary-info m-ffr st-dc s-fs">{project.client}</td>
                                            <td className="column-cell align-left secondary-info m-ffr st-dc s-fs">{project.creactionDate}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    )
                ) : (
                    <code>No projects yet</code>
                )}
            </div>
        </div>
    )
}


// Get dominant color & darken
function getDominantColor(imgSrc) {
    return new Promise((resolve) => {
        const img = new Image()
        img.crossOrigin = "anonymous"
        img.src = imgSrc

        img.onload = () => {
            const canvas = document.createElement("canvas")
            const ctx = canvas.getContext("2d")

            canvas.width = img.width
            canvas.height = img.height

            ctx.drawImage(img, 0, 0)
            const imageData = ctx.getImageData(0, 0, img.width, img.height).data

            let r = 0, g = 0, b = 0, count = 0

            for (let i = 0; i < imageData.length; i += 4) {
                r += imageData[i]
                g += imageData[i + 1]
                b += imageData[i + 2]
                count++
            }

            let R = Math.round(r / count)
            let G = Math.round(g / count)
            let B = Math.round(b / count)

            const factor = 0.8
            resolve({
                r: Math.round(R * factor),
                g: Math.round(G * factor),
                b: Math.round(B * factor)
            })
        }
    })
}
