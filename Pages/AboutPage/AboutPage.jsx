import "./AboutPage.css"
import TextSlider from "../../Components/TextSlider/TextSlider"
import Element3D from "../../Components/Element3D/Element3D"
import HomeButton from "../../Components/HomeButton/HomeButton"
import socials from "../../Database/socials"
import navigationManagement from "../../Stores/navigationManagement"
import { useEffect } from "react"
import { DevelopementIcon, DesignIcon, InteractionIcon } from "../../Components/ServicesIcons/icons"

export default function AboutPage() {
    const { endTransition } = navigationManagement()

    useEffect(() => {
        document.body.classList.remove('bgc-l')
        document.body.classList.add('bgc-d')
        window.scrollTo(0, 0)
        endTransition()
    }, [])

    const getAge = () => {
        const date = new Date()
        const currentYear = date.getFullYear()

        return currentYear - 2005
    }

    useEffect(() => {
        const items = document.querySelectorAll(".navigation-item")
        const sections = document.querySelectorAll(".about-content")

        // Click to scroll to the section targeted
        items.forEach(item => {
            item.addEventListener("click", () => {
                const targetId = item.dataset.target
                console.log(targetId)
                const targetElement = document.getElementById(targetId)
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: "smooth", block: "start" })
                }
            })
        })

        // Observe and detect the visible section
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const id = entry.target.id

                if (entry.isIntersecting) {
                    // remove all highlights
                    items.forEach(i => i.classList.remove("active"))

                    // highlight 
                    const activeItem = document.querySelector(`.navigation-item[data-target="${id}"]`)
                    if (activeItem) activeItem.classList.add("active")
                }
            })
        },
            {
                root: null,
                threshold: 0.8, // section visible at 30%
            }
        )

        // Observe each section
        sections.forEach(section => observer.observe(section))

        return () => observer.disconnect()
    }, [])

    return (
        <div className="about-page m-ffr">
            <HomeButton />
            <div className="side-content left-content">
                <div className="navigation-container s-fs">
                    <span data-target="introduction" className="navigation-item">introduction</span>
                    <span data-target="informations" className="navigation-item">informations</span>
                    <span data-target="services" className="navigation-item">services</span>
                    <span data-target="socials" className="navigation-item">socials</span>
                    <span data-target="contact" className="navigation-item">contact</span>
                </div>
            </div>
            <div className="side-content right-content">
                <div className="about-content introduction-content" id="introduction">
                    <div className="indicator-container">
                        <span className="indicator s-fs st-lc">introduction</span>
                    </div>
                    <div className="content">
                        <span className="introduction-text b-fs mt-lc">I’m a Web Developer and Designer with a strong passion for front-end development and creating unique digital experiences.</span>
                        <span className="introduction-text m-fs st-lc">I take pride in writing clean, high-quality code, optimizing performance, and designing responsive, visually appealing interfaces that deliver exceptional user experiences.</span>
                    </div>
                </div>
                <div className="about-content informations-content" id="informations">
                    <div className="indicator-container">
                        <span className="indicator s-fs st-lc">informations</span>
                    </div>
                    <div className="content">
                        <div className="row-content">
                            <span className="information-title mt-lc m-fs">Full name</span>
                            <span className="information-content st-lc m-fs">Abdelhak Mezaguer</span>
                        </div>
                        <div className="row-content">
                            <span className="information-title mt-lc m-fs">Age</span>
                            <span className="information-content st-lc m-fs">{getAge()} years old</span>
                        </div>
                        <div className="row-content">
                            <span className="information-title mt-lc m-fs">Location</span>
                            <span className="information-content st-lc m-fs">Algeria, Algiers</span>
                        </div>
                        <div className="row-content">
                            <span className="information-title mt-lc m-fs">Role</span>
                            <span className="information-content st-lc m-fs">Fullstack developper</span>
                        </div>
                        <div className="row-content">
                            <span className="information-title mt-lc m-fs">Stack</span>
                            <span className="information-content st-lc m-fs">html, css, JavaScript, ReactJs</span>
                        </div>
                    </div>
                </div>
                <div className="about-content services-content" id="services">
                    <div className="indicator-container">
                        <span className="indicator s-fs st-lc">can help you with..</span>
                    </div>
                    <div className="content">
                        <Element3D>
                            <div className="service-container web-developement-service">
                                <div className="upper-content">
                                    <span className="service-title m-ffb">web developement</span>
                                    <div className="inner-content">
                                        <DevelopementIcon size={15} />
                                        <DesignIcon size={15} />
                                        <InteractionIcon size={15} />
                                    </div>
                                </div>
                                <DevelopementIcon size={70} />
                                <div className="upper-content">
                                    <div className="inner-content">
                                        <DevelopementIcon size={15} />
                                        <span className="service-tag">MAS-001</span>
                                    </div>
                                    <span className="service-title m-ffb">web developement</span>
                                </div>
                            </div>
                        </Element3D>
                        <Element3D>
                            <div className="service-container web-design-service">
                                <div className="upper-content">
                                    <span className="service-title m-ffb">web design</span>
                                    <div className="inner-content">
                                        <DevelopementIcon size={15} />
                                        <DesignIcon size={15} />
                                        <InteractionIcon size={15} />
                                    </div>
                                </div>
                                <DesignIcon size={70} />
                                <div className="upper-content">
                                    <div className="inner-content">
                                        <DesignIcon size={15} />
                                        <span className="service-tag">MAS-002</span>
                                    </div>
                                    <span className="service-title m-ffb">web design</span>
                                </div>
                            </div>
                        </Element3D>
                        <Element3D>
                            <div className="service-container web-interaction-service">
                                <div className="upper-content">
                                    <span className="service-title m-ffb">web interaction</span>
                                    <div className="inner-content">
                                        <DevelopementIcon size={15} />
                                        <DesignIcon size={15} />
                                        <InteractionIcon size={15} />
                                    </div>
                                </div>
                                <InteractionIcon size={70} />
                                <div className="upper-content">
                                    <div className="inner-content">
                                        <InteractionIcon size={15} />
                                        <span className="service-tag">MAS-003</span>
                                    </div>
                                    <span className="service-title m-ffb">web interaction</span>
                                </div>
                            </div>
                        </Element3D>
                    </div>
                </div>
                <div className="about-content socials-content" id="socials">
                    <div className="indicator-container">
                        <span className="indicator s-fs st-lc">socials</span>
                    </div>
                    <div className="content">
                        {socials.map((social, index) => (
                            <TextSlider
                                key={index}
                                size={"m-h"}
                                type={"navigate"}
                                redirectTo={"/"}
                                classGiven={"mt-lc m-fs"}
                                firstTextLayer={social.name}
                                secondTextLayer={social.name}
                            />
                        ))}
                    </div>
                </div>
                <div className="about-content contact-content" id="contact">
                    <div className="indicator-container">
                        <span className="indicator s-fs st-lc">contact</span>
                    </div>
                    <div className="content">
                        <TextSlider
                            size={"m-h"}
                            type={"link"}
                            redirectTo={""}
                            classGiven={"mt-lc m-fs"}
                            firstTextLayer={<>abdelhakdev.contact<span className="t-ff m-c">@</span>gmail.com</>}
                            secondTextLayer={<>abdelhakdev.contact<span className="t-ff m-c">@</span>gmail.com</>}
                        />
                    </div>
                </div>
            </div >
        </div >
    )
}
