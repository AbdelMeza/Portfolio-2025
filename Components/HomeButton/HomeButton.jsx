import './HomeButton.css'
import TextSlider from '../TextSlider/TextSlider'
import { useLocation, useNavigate } from 'react-router-dom'
import navigationManagement from '../../Stores/navigationManagement'
import { useEffect } from 'react'

export default function HomeButton() {
    const navigate = useNavigate()
    const { startTransition, targetPath } = navigationManagement()

    useEffect(() => {
        if (!targetPath) return

        const tile = document.querySelector('.tile:last-child')
        if (!tile) return

        if (tile.getBoundingClientRect().top === 0) {
            navigate(targetPath)
            return
        }

        const handleAnimationEnd = () => {
            navigate(targetPath)
        }

        tile.addEventListener('transitionend', handleAnimationEnd)

        return () => {
            tile.removeEventListener('transitionend', handleAnimationEnd)
        }
    }, [targetPath])

    return <>
        <div className="home-button" onClick={() => { startTransition('/') }}>
            <TextSlider
                size={"s-h"}
                classGiven={"m-ffr s-fs"}
                firstTextLayer={"Back"}
                secondTextLayer={"Back"}
            />
        </div>
    </>
}