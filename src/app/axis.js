export default function Axis({scaleIncrements, theme}) {
    const dark = theme === 'dark';
    const light = theme === 'light';

    return (
        <>
            <div className={`axis ${dark && 'axis--dark-theme'} ${light && 'axis--light-theme'}`} />
            {scaleIncrements.map((el, i) =>
                <p key={'x axis number ' + i} className={`axisNumber axisNumberX ${dark && 'axisNumberX--dark-theme text--dark-theme'} ${light && 'axisNumberX--light-theme text--light-theme'}`} style={{left: el.width}}>{el.width}</p>
            )}
            {scaleIncrements.map((el, i) =>
                <p key={'y axis number ' + i} className={`axisNumber axisNumberY ${dark && 'axisNumberY--dark-theme text--dark-theme'} ${light && 'axisNumberY--light-theme text--light-theme'}`} style={{top: el.height}}>{el.height}</p>
            )}
        </>
    )
}