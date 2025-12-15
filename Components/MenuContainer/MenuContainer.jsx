import { useLocation, useNavigate, useParams } from 'react-router-dom'
import navigationManagement from '../../Stores/navigationManagement'
import './MenuContainer.css'
import { useEffect } from 'react'
import menuManagement from '../../Stores/menuManagement'

export default function MenuContainer() {
    const location = useLocation()
    const currentPath = location.pathname
    const navigate = useNavigate()
    const { startTransition, targetPath } = navigationManagement()
    const { isOpened } = menuManagement()

    const handleTransition = (path)=>{
        if (path === currentPath) return

        startTransition(path)
    }

    // When a path is selected, wait for the transition to finish before navigating
    useEffect(() => {
        if (!targetPath) return

        const tile = document.querySelector('.tile:last-child')
        if (!tile) return

        if(tile.getBoundingClientRect().top === 0){
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

    return (
        <div className={`menu-container ${isOpened ? "opened" : ""}`}>
            <div className="menu-content">
                <div className="menu-link-container">
                    <span className="menu-link s-ff mt-dc" style={{transitionDelay: `${0.05 * 2}s`}} onClick={() => handleTransition('/')} >home</span>
                </div>
                <div className="menu-link-container">
                    <span className="menu-link s-ff mt-dc" style={{transitionDelay: `${0.05 * 3.5}s`}} onClick={() => handleTransition('/about')} >about</span>
                </div>
                <div className="menu-link-container">
                    <span className="menu-link s-ff mt-dc" style={{transitionDelay: `${0.05 * 5}s`}} onClick={() => handleTransition('/work')} >work</span>
                </div>
                <div className="menu-link-container">
                    <span className="menu-link s-ff mt-dc" style={{transitionDelay: `${0.05 * 6.5}s`}} onClick={() => handleTransition('/contact')} >contact</span>
                </div>
            </div>
        </div>
    )
}
