import './HomePage.css'
import TextSlider from '../../Components/TextSlider/TextSlider'
import socials from '../../Database/socials.js'
import { useEffect, useState } from 'react'
import navigationManagement from '../../Stores/navigationManagement.jsx'

export default function HomePage() {
    const { endTransition } = navigationManagement()

    useEffect(() => {
        endTransition()
    }, [])

    return <div className="home-page">
        <div className="blocs-container">
            <div className="bloc horizental"></div>
            <div className="bloc vertical"></div>
        </div>
        <NavBar />
        <HomeContent />
    </div>
}

function NavBar() {
    const getTime = () => {
        const time = new Date()
        const options = { timeZone: 'Africa/Algiers', hour: '2-digit', minute: '2-digit', second: '2-digit' }
        return time.toLocaleTimeString('fr-DZ', options)
    }

    const [localTime, setLocalTime] = useState(getTime())

    useEffect(() => {
        const interval = setInterval(() => setLocalTime(getTime()), 1000)

        return () => clearInterval(interval)
    }, [])

    return <div className="navigation-bar">
        <div className="side-content main-link-container">
            <TextSlider
                size={"s-h"}
                type={"navigate"}
                redirectTo={"/"}
                classGiven={"m-ffr mt-dc"}
                firstTextLayer={"Abdelhak"}
                secondTextLayer={"Abdelhak"}
            />
            <img src="https://raw.githubusercontent.com/AbdelMeza/Assets/86483d231f7266aeb0339935504fc3bfe610c562/Icon/abdelhak-icon.png" width={20} alt="icon-image" />
        </div>
        <div className="side-content main-informations-container m-ffr mt-dc s-fs">
            <div className="information-container">
                <div className="information-title">Socials</div>
                <div className="information-details">
                    {socials ?
                        socials.map((social, index) => (
                            <TextSlider
                                size={"s-h"}
                                type={"link"}
                                key={index}
                                redirectTo={social.link}
                                firstTextLayer={social.name}
                                secondTextLayer={social.name}
                                classGiven={"st-dc st-hover"}
                            />
                        )) : <span>No socials yet</span>}
                </div>
            </div>
            <div className="information-container">
                <div className="information-title">Location/Time</div>
                <div className="information-details">
                    <span className="location st-dc">Algeria/Algiers</span>
                    <span className="time st-dc">{localTime}</span>
                </div>
            </div>
        </div>
    </div>
}

function HomeContent() {
    return <div className="home-content">
        <span className="home-page-text s-ff mt-dc">abdelhak<span className="t-ff m-c">©</span>2025</span>
    </div>
}