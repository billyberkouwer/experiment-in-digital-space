export default function Dots({mouseX, mouseY, opacity, theme}) {
    const dark = theme === 'dark';
    const light = theme === 'light';

    return (
        <div className="mouseObjectContainer" style={{opacity: opacity, top: mouseY, left: mouseX}} >
            <div className={`mouseObjectBackground ${dark && 'mouseObjectBackground--dark-theme'} ${light && 'mouseObjectBackground--light-theme'}`}></div>
            <div className={`mouseObject ${dark && 'mouseObject--dark-theme'} ${light && 'mouseObject--light-theme'}`}></div>
            <p className={`mouseText ${dark && 'text--dark-theme'} ${light && 'text--light-theme'} `}>X: {mouseX} Y: {mouseY}</p>
        </div>
    )
}