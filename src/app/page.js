"use client";

import { Canvas } from "@react-three/fiber";
import { Plane } from "components/3d/Plane";
import { Torus } from "components/3d/Torus";
import useClickCount from "hooks/useClickCount";
import useMousePosition from "hooks/useMousePosition";
import usePageWidth from "hooks/usePageSize";
import { createElement, useEffect, useState } from "react";
import { Fog } from "three";

export default function HomePage(props) {
  const pageWidth = usePageWidth();
  const mousePosition = useMousePosition();
  const clickCount = useClickCount();
  const [dots, setDots] = useState([]);

  useEffect(() => {
    if (clickCount > 0) {
      const div = createElement(
        "div",
        {
          style: {
            position: "absolute",
            top: mousePosition.y,
            left: mousePosition.x,
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: "10px",
          },
        },
        createElement(
          "div", 
          {
            style: {
                width: "10px",
                height: "10px",
                minWidth: "10px",
                minHeight: "10px",
                backgroundColor: "red",
            },
        }),
        createElement(
          "p",
          {
            style: {
              margin: 0,
              position: "relative",
              top: "-0.33em",
            },
          },
          `x: ${mousePosition.x}, y: ${mousePosition.y}`
        )
      );
      setDots((prev) => [...prev, div]);
    }
  }, [clickCount]);

  return (
    <div id="container">
      <Canvas style={{position: 'absolute', height: '100vh', width: '100vw', top: 0}} fog>
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
          }}
        ></div>
      ) : null}
      {dots}
    </div>
  );
}
