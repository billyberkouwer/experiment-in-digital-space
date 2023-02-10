"use client";

import { Canvas } from "@react-three/fiber";
import { Plane } from "components/3d/Plane";
import { Torus } from "components/3d/Torus";
import useClickCount from "hooks/useClickCount";
import useMousePosition from "hooks/useMousePosition";
import usePageWidth from "hooks/usePageSize";
import isMobile from "is-mobile";
import { createElement, useEffect, useState } from "react";

export default function HomePage(props) {
  const pageWidth = usePageWidth();
  const mousePosition = useMousePosition();
  const clickCount = useClickCount();
   const [dots, setDots] = useState([]);

  useEffect(() => {
    if (clickCount > 0 && clickCount !== dots.length) {
      const div = createElement(
        "div",
        {
          className: "mouseObjectContainer",
          style: {
            top: mousePosition.y,
            left: mousePosition.x,
          },
          key: 'point' + Math.random(),
        },
        createElement(
          "div", 
          {
            className: "mouseObject",
            style: {
                backgroundColor: "red",
            },
        }),
        createElement(
          "p",
          {
            className: "mouseText",
          },
          `X: ${mousePosition.x} Y:${mousePosition.y}`
        )
      );
      setDots((prev) => {return [...prev, div]});
      console.log(clickCount)
    }
  }, [clickCount, dots, mousePosition]);

  if (isMobile()) {
    return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', textAlign: 'center'}}>
        <Canvas style={{position: 'absolute', height: '100vh', width: '100vw', top: 0}} >
          <Torus />
          <Plane />
        </Canvas>
        <h2 style={{maxWidth: '200px'}}>
          visit this site on desktop
        </h2>
      </div>
    )
  } else {return (
    <div id="container">
      <Canvas style={{position: 'absolute', height: '100vh', width: '100vw', top: 0}} >
        <fog attach="fog" color="black" near={1} far={10} />
        <directionalLight position={[0,5,0]}/>
        <Torus />
        <Plane />
      </Canvas>
      <p>
        {pageWidth.x} {pageWidth.y}
      </p>
      {mousePosition.x && mousePosition.y ? (
        <div
          className="mouseObjectContainer"
          style={{ 
            top: mousePosition.y ,
            left: mousePosition.x ,
          }}
        >
          <div className="mouseObject" style={{border: 'solid white 1px'}}></div>
          <p className="mouseText">X: {mousePosition.x} Y: {mousePosition.y}</p>
        </div>
      ) : null}
      {dots}
    </div>
  );}
}
