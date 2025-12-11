import { useEffect } from 'react'
import menuManagement from '../../Stores/menuManagement'
import navigationManagement from '../../Stores/navigationManagement'
import './TileContainer.css'

export default function TileContainer({ tileNumber }) {
    const { isOpened, changeMenuState, setMenuState } = menuManagement()
    const { isTransitioning } = navigationManagement()

    //Create the tiles dependind on the number selected
    const createTiles = () => {
        const tiles = []

        for (let i = 0; i < tileNumber; i++) {
            tiles.push(<div key={i} className="tile" style={{ transitionDelay: `${0.05 * i * 1.5}s`, width: `${100 / tileNumber}%` }}></div>)
        }

        return tiles
    }

    useEffect(() => {
        if (isTransitioning) {
            setMenuState(false)
        }
    }, [isTransitioning, changeMenuState])

    const tileState = () => {
        if (isTransitioning) {
            return "transitioning"
        } else if (isOpened) {
            return "opened"
        } else {
            return ""
        }
    }

    return <div className={`tile-container ${tileState()}`}>
        {createTiles()}
    </div>
}