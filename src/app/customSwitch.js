export default function CustomSwitch({theme, setTheme}) {
    const light = theme === 'light';

    return (
        <button onClick={() => light ? setTheme('dark') : setTheme('light')} className={`switch ${light && 'switch--light-theme'}`} >
            <div className={`thumb ${light && 'thumb--light-theme'}`} />
        </button>
    )
}