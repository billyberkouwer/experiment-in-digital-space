export default function Axis({scaleIncrements}) {
    return (
        <>
            <div className="axis" />
            {scaleIncrements.map((el, i) =>
                <p className="axisNumber axisNumberX" style={{left: el.width}}>{el.width}</p>
            )}
            {scaleIncrements.map((el, i) =>
                <p className="axisNumber axisNumberY" style={{top: el.height}}>{el.height}</p>
            )}
        </>
    )
}