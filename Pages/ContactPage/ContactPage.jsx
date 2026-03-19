import { useEffect, useState, useRef } from "react"
import navigationManagement from "../../Stores/navigationManagement"
import HomeButton from "../../Components/HomeButton/HomeButton"
import './ContactPage.css'
import TextSlider from "../../Components/TextSlider/TextSlider"
import themeManagement from "../../Stores/themeManagement"
import emailjs from '@emailjs/browser'


const StatusMessage = ({ msg, onExpire }) => {
    useEffect(() => {
        const timer = setTimeout(onExpire, 2500)
        return () => clearTimeout(timer)
    }, [onExpire])

    return (
        <div className="m-ffr s-fs status-message mt-lc">
            {msg.text}
        </div>
    )
}

export default function ContactPage() {
    const { endTransition } = navigationManagement()
    const { setTheme } = themeManagement()

    const [activeService, setActiveService] = useState([])
    const [activeTimeframe, setActiveTimeframe] = useState("")
    const [status, setStatus] = useState([])

    const fullnameRef = useRef()
    const emailRef = useRef()
    const companyRef = useRef()
    const websiteRef = useRef()
    const descriptionRef = useRef()

    useEffect(() => {
        setTheme("dark")
        window.scrollTo(0, 0)
        endTransition()
    }, [])

    const addStatus = (text) => {
        const id = Date.now() + Math.random()
        setStatus((prev) => [...prev, { id, text }])
    }

    const handleSendEmail = (e) => {
        if (e) e.preventDefault()

        if (status.length >= 6) return

        if (!fullnameRef.current.value || !emailRef.current.value || activeService.length === 0) {
            addStatus("Missing required information")
            return
        }

        addStatus("Sending message, please wait...")

        const templateParams = {
            fullname: fullnameRef.current.value,
            email: emailRef.current.value,
            company: companyRef.current.value || "Not provided",
            website: websiteRef.current.value || "Not provided",
            services: activeService.join(", "),
            timeframe: activeTimeframe || "Not specified",
            description: descriptionRef.current.value
        }

        emailjs.send(
            import.meta.env.VITE_SERVICE_ID,
            import.meta.env.VITE_TEMPLATE_ID,
            templateParams,
            import.meta.env.VITE_PUBLIC_KEY
        )
            .then(() => {
                addStatus("Message sent, i'll reach out soon")
                fullnameRef.current.value = ""
                emailRef.current.value = ""
                companyRef.current.value = ""
                websiteRef.current.value = ""
                descriptionRef.current.value = ""
                setActiveService([])
                setActiveTimeframe("")
            })
            .catch((err) => {
                console.error(err)
                addStatus("Something went wrong")
            })
    }

    return (
        <div className="contact-page">
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
                                <input ref={fullnameRef} type="text" className="fullname-input" placeholder="Fullname" required />
                                <input ref={emailRef} type="email" className="email-input" placeholder="Email" required />
                                <input ref={companyRef} type="text" className="email-input" placeholder="Company name (if any)" />
                                <input ref={websiteRef} type="text" className="email-input" placeholder="Website link (if any)" />
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
                                    <div
                                        key={index}
                                        className={`service mt-lc ${activeService.includes(service) ? 'active' : ''}`}
                                        onClick={() => {
                                            if (activeService.includes(service)) {
                                                setActiveService(activeService.filter(s => s !== service))
                                            } else {
                                                setActiveService([...activeService, service])
                                            }
                                        }}
                                    >
                                        {service}
                                    </div>
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
                                    <div
                                        key={index}
                                        className={`timeframe mt-lc ${activeTimeframe === timeframe ? 'active' : ''}`}
                                        onClick={() => setActiveTimeframe(timeframe)}
                                    >
                                        {timeframe}
                                    </div>
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
                                <textarea ref={descriptionRef} name="project-description" placeholder="Describe your project" required></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lower-content m-ffr">
                    <div className="side-content">
                        <span className="mt-lc s-fs"><span className="m-c">(*)</span> Required fields</span>
                    </div>
                    <div className="side-content">
                        <button
                            className={`m-ffr s-fs submit-button ${status.length >= 6 ? 'disabled' : ''}`}
                            onClick={handleSendEmail}
                            disabled={status.length >= 6}
                        >
                            <TextSlider
                                classGiven={"mt-dc s-fs"}
                                firstTextLayer={status.length >= 6 ? "Too many requests" : "Submit your projet"}
                                secondTextLayer={status.length >= 6 ? "Too many requests" : "Submit your projet"}
                            />
                        </button>
                    </div>
                </div>
                <div className="form-status-container">
                    {status.map((msg) => (
                        <StatusMessage
                            key={msg.id}
                            msg={msg}
                            onExpire={() => {
                                setStatus(prev => prev.filter(item => item.id !== msg.id))
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}