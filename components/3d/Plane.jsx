import { useEffect, useRef } from "react";
import { Color, PlaneGeometry } from "three";
import { lineMaterial } from "./Materials";

export function Plane({theme}) {
  const ref = useRef();
  const geo = new PlaneGeometry(20,10,100,200);
  if (theme === 'dark') {
    lineMaterial.color = new Color('white')
  }
  if (theme === 'light') {
    lineMaterial.color = new Color('black')
  }
  useEffect(() => {
    if (ref.current) {
      ref.current.rotation.x = Math.PI/2;
    }
  }, [])
  return (
    <lineSegments material={lineMaterial} geometry={geo} rotation={[Math.PI/2, 0, 0]} position={[0,-2,0]}/>
  );
}
