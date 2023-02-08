'use client'

import useClickCount from "hooks/useClickCount";
import useMousePosition from "hooks/useMousePosition";
import usePageWidth from "hooks/usePageSize";
import { createElement, useEffect, useState } from "react";

export default function HomePage(props) {
    const pageWidth = usePageWidth();
    const mousePosition = useMousePosition();
    const clickCount = useClickCount();
    const [dots, setDots] = useState([]);

    useEffect(() => {
        if (clickCount > 0) {
            const div = createElement("div", 
            {style: {
                width: '10px', 
                height: '10px', 
                backgroundColor: 'red',
                position: 'absolute',
                top: mousePosition.y,
                left: mousePosition.x,
            }});
            setDots(prev => [...prev, div]);
        };
    }, [clickCount]);

    return (
        <div id='container'>
            <h1>Test</h1>
            <p>{pageWidth.x} {pageWidth.y}</p>
            <p>{mousePosition.x} {mousePosition.y}</p>
            <div style={{
                width: '10px', 
                height: '10px', 
                backgroundColor: 'black',
                position: 'absolute',
                top: mousePosition.y,
                left: mousePosition.x,
            }}></div>
            {dots}
        </div>
    );
};