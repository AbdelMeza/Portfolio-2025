import { useNavigate } from 'react-router-dom'
import './TextSlider.css'

export default function TextSlider({ animate, size, firstTextLayer, secondTextLayer, classGiven, type, redirectTo }) {
    const navigate = useNavigate()

    function createContent(content) {
        if (type === "link") {
            return <a className={`slide-text`} href={redirectTo}>{content}</a>
        } else if (type === "navigate") {
            return <span className={`slide-text`} onClick={() => navigate(redirectTo)}>{content}</span>
        } else{
            return <span className={`slide-text`}>{content}</span>
        }
    }

    return <div className={`text-slider ${size ? size : "s-h"} ${classGiven ? classGiven : ""}`}>
        {createContent(firstTextLayer)}
        {secondTextLayer ? createContent(secondTextLayer) : createContent(firstTextLayer)}
    </div>
}