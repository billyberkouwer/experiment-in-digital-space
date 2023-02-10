"use client";

import { Canvas } from "@react-three/fiber";
import { Plane } from "components/3d/Plane";
import { Torus } from "components/3d/Torus";
import useClickCount from "hooks/useClickCount";
import useMousePosition from "hooks/useMousePosition";
import usepageSize from "hooks/usePageSize";
import isMobile from "is-mobile";
import { createElement, useEffect, useState } from "react";
import Dots from "./dots";

export default function HomePage(props) {
  const pageSize = usepageSize();
  const mousePosition = useMousePosition();
  const clickCount = useClickCount();
  const [dots, setDots] = useState([]);
  const [mousePositions, setMousePositions] = useState([]);
  const [isMobileClient, setIsMobileClient] = useState(false);
  const [maxScreen, setMaxScreen] = useState({width: 0, height: 0});
  const [scaleIncrements, setScaleIncrements] = useState([])

  useEffect(() => {
    setIsMobileClient(isMobile());
    setMaxScreen({width: window.innerWidth, height: window.innerHeight})
  }, []);

  useEffect(() => {
    const widthInc = Math.round(pageSize.x / 10);
    const heightInc = Math.round(pageSize.y / 10);
    const increments = [];
    for (let i = 0; i < 10; i++) {
      increments.push({
        width: widthInc * i,
        height: heightInc * i,
      })
    }
    setScaleIncrements(increments)
  }, [pageSize])

  useEffect(() => {
    const mousePos = { x: mousePosition.x, y: mousePosition.y };
    setMousePositions((prev) => [...prev.slice(prev.length - 300), mousePos]);
  }, [clickCount]);

  if (isMobileClient) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          textAlign: "center",
        }}
      >
        <Canvas
          style={{
            position: "absolute",
            height: "100vh",
            width: "100vw",
            top: 0,
          }}
        >
          <Torus />
          <Plane />
        </Canvas>
        <h3 style={{ maxWidth: "200px" }}>visit this site on desktop</h3>
      </div>
    );
  } else {
    return (
      <div id="container" style={{maxWidth: maxScreen.width + 'px', maxHeight: maxScreen.height + 'px', overflow: 'hidden', width: '100%', height: '100vh'}}>
        <Canvas
          style={{
            position: "absolute",
            height: "100vh",
            width: "100vw",
            top: 0,
          }}
        >
          <fog attach="fog" color="black" near={1} far={10} />
          <Torus />
          <Plane />
        </Canvas>
        {mousePosition.x && mousePosition.y ? (
          <div
            className="mouseObjectContainer"
            style={{
              top: mousePosition.y,
              left: mousePosition.x,
            }}
          >
            <div
              className="mouseObject"
              style={{ border: "solid white 1px" }}
            ></div>
            <p className="mouseText">
              X: {mousePosition.x} Y: {mousePosition.y}
            </p>
          </div>
        ) : null}
        <div className="axis" />
        {scaleIncrements.map((el, i) =>
          <p className="axisNumber axisNumberX" style={{left: el.width}}>{el.width}</p>
        )}
        {scaleIncrements.map((el, i) =>
        <>
          <p className="axisNumber axisNumberY" style={{top: el.height}}>{el.height}</p>
          {console.log(el)}
        </>
        )}
        {mousePositions.map((el, i) => {
          if (mousePositions.length - i <= 300) {
            return (
              <Dots
                key={"dot " + i}
                mouseX={el.x}
                mouseY={el.y}
                opacity={i / mousePositions.length}
              />
            );
          }
        })}
      </div>
    );
  }
}