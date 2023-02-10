export default function Dots({mouseX, mouseY, opacity}) {
    return (
        <div className="mouseObjectContainer" style={{opacity: opacity, top: mouseY, left: mouseX}} >
            <div className="mouseObject" style={{backgroundColor: 'red'}}></div>
            <p className="mouseText">X: {mouseX} Y: {mouseY}</p>
        </div>
    )
}