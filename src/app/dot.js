export default function Dots({mouseX, mouseY, opacity}) {
    return (
        <div className="mouseObjectContainer" style={{opacity: opacity, top: mouseY, left: mouseX}} >
            <div className="mouseObjectBackground"></div>
            <div className="mouseObject" style={{backgroundColor: 'rgba(255,255,255,0.1)'}}></div>
            <p className="mouseText">X: {mouseX} Y: {mouseY}</p>
        </div>
    )
}