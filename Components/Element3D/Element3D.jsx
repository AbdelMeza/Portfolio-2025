import { useEffect, useRef, useState } from "react"
import "./Element3D.css"

export default function Element3D({ children }) {
    const cardRef = useRef(null)
    const glossRef = useRef(null)
    const [windowWidth, setWindowWidth] = useState()

    useEffect(() => {
        setWindowWidth(window.innerWidth)
    }, [])

    window.addEventListener('resize', () => setWindowWidth(window.innerWidth))

    useEffect(() => {
        if (windowWidth < 450) return

        const card = cardRef.current
        const gloss = glossRef.current

        if (!card || !gloss) return

        const handleMove = (e) => {
            const pointerX = e.clientX
            const pointerY = e.clientY

            const cardRect = card.getBoundingClientRect()
            const halfWidth = cardRect.width / 2
            const halfHeight = cardRect.height / 2

            const cardCenterX = cardRect.left + halfWidth
            const cardCenterY = cardRect.top + halfHeight

            const deltaX = pointerX - cardCenterX
            const deltaY = pointerY - cardCenterY

            const distanceToCenter = Math.sqrt(deltaX ** 2 + deltaY ** 2)
            const maxDistance = Math.max(halfWidth, halfHeight)

            const degree = (distanceToCenter * 10) / maxDistance
            const rx = deltaY / halfHeight
            const ry = deltaX / halfWidth

            card.style.transform = `perspective(400px) rotate3d(${-rx}, ${ry}, 0, ${degree}deg)`

            gloss.style.transform = `translate(${-ry * 100}%, ${-rx * 100}%) scale(2.4)`
            gloss.style.opacity = (distanceToCenter * 0.6) / maxDistance
        }

        const reset = () => {
            card.style.transform = ""
            gloss.style.opacity = 0
        }

        card.addEventListener("mousemove", handleMove)
        card.addEventListener("mouseleave", reset)

        return () => {
            card.removeEventListener("mousemove", handleMove)
            card.removeEventListener("mouseleave", reset)
        }
    }, [windowWidth])

    return (
        <div className="element-3d" ref={cardRef}>
            <div className="gloss" ref={glossRef}></div>
            {children}
        </div>
    )
}
