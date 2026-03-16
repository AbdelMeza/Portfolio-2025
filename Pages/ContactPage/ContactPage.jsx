import { useEffect, useState } from "react"
import navigationManagement from "../../Stores/navigationManagement"
import HomeButton from "../../Components/HomeButton/HomeButton"
import './ContactPage.css'
import TextSlider from "../../Components/TextSlider/TextSlider"
import themeManagement from "../../Stores/themeManagement"

export default function ContactPage() {
    const { endTransition } = navigationManagement()
    const { setTheme } = themeManagement()
    const [activeService, setActiveService] = useState([])
    const [activeTimeframe, setActiveTimeframe] = useState("")

    useEffect(() => {
        setTheme("dark")
        window.scrollTo(0, 0)
        endTransition()
    }, [])

    return <div className="contact-page">
        <HomeButton />
        <div className="content">
            <span className="m-ffr mt-lc">Let's build something</span>
            <span className="m-ffr mt-lc">Feel free to reach out.</span>
        </div>
        <div className="contact-content">
            <div className="form-container m-ffr s-fs">
                <div className="form-content general-informations">
                    <div className="step-indicator">
                        <span className="step-index st-lc">(1)</span>
                        <span className="step-title">
                            <span className="st-lc">general informations</span>
                            <span className="m-c required">(*)</span>
                        </span>
                    </div>
                    <div className="step-content">
                        <span className="header-text mt-lc">Include your personal details.</span>
                        <div className="inputs-container">
                            <input type="text" className="fullname-input" placeholder="Fullname" />
                            <input type="email" className="email-input" placeholder="Email" />
                            <input type="text" className="email-input" placeholder="Company name (if any)" />
                            <input type="text" className="email-input" placeholder="Website link (if any)" />
                        </div>
                    </div>
                </div>
                <div className="form-content general-informations">
                    <div className="step-indicator">
                        <span className="step-index st-lc">(2)</span>
                        <span className="step-title">
                            <span className="st-lc">Services</span>
                            <span className="m-c required">(*)</span>
                        </span>
                    </div>
                    <div className="step-content">
                        <span className="header-text mt-lc">Select the service(s) you're looking for.</span>
                        <div className="services-container">
                            {["Front-end developement", "Back-end developement", "Web design", "Web interaction"].map((service, index) => (
                                <div key={index} className={`service mt-lc ${activeService.includes(service) ? 'active' : ''}`} onClick={() => {
                                    if (activeService.includes(service)) {
                                        setActiveService(activeService.filter(s => s !== service));
                                    } else {
                                        setActiveService([...activeService, service]);
                                    }
                                }}>{service}</div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="form-content general-informations">
                    <div className="step-indicator st-lc">
                        <span className="step-index">(3)</span>
                        <span className="step-title">timeframe</span>
                    </div>
                    <div className="step-content">
                        <span className="header-text mt-lc">Choose the timeframe that fits your project.</span>
                        <div className="timeframes-container">
                            {["Less than a month", "1-2 month", "2-3 month", "3-6 month", "More than 6 months"].map((timeframe, index) => (
                                <div key={index} className={`timeframe mt-lc ${activeTimeframe.includes(timeframe) ? 'active' : ''}`} onClick={() => setActiveTimeframe(timeframe)}>{timeframe}</div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="form-content general-informations">
                    <div className="step-indicator">
                        <span className="step-index st-lc">(4)</span>
                        <span className="step-title">
                            <span className="st-lc">project description</span>
                            <span className="m-c required">(*)</span>
                        </span>
                    </div>
                    <div className="step-content">
                        <span className="header-text mt-lc">What do you want to build and why?</span>
                        <div className="textarea-container">
                            <textarea name="project-description" placeholder="Describe your project"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div className="lower-content m-ffr">
                <div className="side-content">
                    <span className="mt-lc s-fs"><span className="m-c">(*)</span> Required fields</span>
                </div>
                <div className="side-content">
                    <button className="submit-button m-ffr s-fs">
                        <TextSlider
                            size={"s-h"}
                            classGiven={"mt-dc s-fs"}
                            firstTextLayer={"Submit"}
                            secondTextLayer={"Submit"}
                        />
                    </button>
                </div>
            </div>
        </div>
    </div>
}