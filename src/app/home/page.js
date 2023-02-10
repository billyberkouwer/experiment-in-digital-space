"use client";

import { Canvas } from "@react-three/fiber";
import { Plane } from "components/3d/Plane";
import { Torus } from "components/3d/Torus";
import useClickCount from "hooks/useClickCount";
import useMousePosition from "hooks/useMousePosition";
import usePageWidth from "hooks/usePageSize";
import isMobile from "is-mobile";
import { useRouter } from "next/navigation";
import { createElement, useEffect, useState } from "react";
import Dots from "../dots";

export default function HomePage(props) {
  const pageWidth = usePageWidth();
  const mousePosition = useMousePosition();
  const clickCount = useClickCount();
   const [dots, setDots] = useState([]);
   const [mousePositions, setMousePositions] = useState([]);

  useEffect(() => {
    if (clickCount !== dots.length) {
      const mousePositions = [];
      for (let i = 0; i < clickCount; i++) {
        mousePositions.push(
          {x: mousePosition.x, y: mousePosition.y}
        );
      }
      setMousePositions(mousePositions)
    }
  }, [clickCount, dots, mousePosition]);

  if (isMobile) {
    return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <h1>
          This is not a mobile exprience. Visit on desktop.
        </h1>
      </div>
    )
  } return (
    <div id="container">
      <Canvas style={{position: 'absolute', height: '100vh', width: '100vw', top: 0}} >
        <fog attach="fog" color="white" near={1} far={10} />
        <Torus />
        <Plane />
      </Canvas>
      <p>
        {pageWidth.x} {pageWidth.y}
      </p>
      <p>
        {mousePosition.x} {mousePosition.y}
      </p>
      {mousePosition.x && mousePosition.y ? (
        <div
          style={{
            width: "10px",
            height: "10px",
            backgroundColor: "black",
            position: "absolute",
            top: mousePosition.y,
            left: mousePosition.x,
            pointerEvents: 'none',
          }}
        ></div>
      ) : null}
      {mousePositions.map((el, i) => (
        <Dots key={'dot ' + i} mouseX={el.x} mouseY={el.y} opacity={1 - i/mousePosition.length} />  
      ))}
    </div>
  );
}