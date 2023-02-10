"use client";

import { Canvas } from "@react-three/fiber";
import { Plane } from "components/3d/Plane";
import { Torus } from "components/3d/Torus";
import useClickCount from "hooks/useClickCount";
import useMousePosition from "hooks/useMousePosition";
import usepageSize from "hooks/usePageSize";
import isMobile from "is-mobile";
import { createElement, useEffect, useState } from "react";
import { Color } from "three";
import Axis from "./axis";
import CustomSwitch from "./customSwitch";
import Dot from "./dot";
import Points from "./points";
import { IOSSwitch } from "./switch";

export default function HomePage(props) {
  const pageSize = usepageSize();
  const mousePosition = useMousePosition();
  const clickCount = useClickCount();
  const [dots, setDots] = useState([]);
  const [mousePositions, setMousePositions] = useState([]);
  const [isMobileClient, setIsMobileClient] = useState(false);
  const [maxScreen, setMaxScreen] = useState({width: 0, height: 0});
  const [scaleIncrements, setScaleIncrements] = useState([]);
  const [theme, setTheme] = useState('dark');
  const dark = theme === 'dark';
  const light = theme === 'light';

  useEffect(() => {
    console.log(theme)
  }, [theme])

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
      <div id="container" 
      className={`${dark && 'container--dark-theme'} ${light && 'container--light-theme'}`} 
      style={{
          overflow: 'hidden', 
          width: '100%', 
          height: '100vh'
        }}>
        <Canvas
          style={{
            position: "absolute",
            height: "100vh",
            width: "100vw",
            top: 0,
            pointerEvents: "none"
          }}
        >
          {light && <fog attach="fog" color="white" near={1} far={10} />}
          {dark && <fog attach="fog" color="black" near={1} far={10} />}
          <Torus theme={theme} />
          <Plane theme={theme} />
        </Canvas>
        <CustomSwitch theme={theme} setTheme={setTheme} />  
        {mousePosition.x && mousePosition.y ? (
          <div
            className="mouseObjectContainer"
            style={{
              top: mousePosition.y,
              left: mousePosition.x,
            }}
          >
            <div
              className={`mouseTracker ${dark && 'mouseTracker--dark-theme'} ${light && 'mouseTracker--light-theme'}`}
            ></div>
            <p className={`mouseText ${dark && 'text--dark-theme'} ${light && 'text--light-theme'}`}>
              X: {mousePosition.x} Y: {mousePosition.y}
            </p>
          </div>
        ) : null}
        <Axis theme={theme} scaleIncrements={scaleIncrements} />   
        <Points theme={theme} mousePositions={mousePositions} />
      </div>
    );
  }
}