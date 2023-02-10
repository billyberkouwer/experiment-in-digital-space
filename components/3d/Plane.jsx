import { useEffect, useRef } from "react";
import { DoubleSide, LineBasicMaterial, PlaneGeometry } from "three";

export function Plane(props) {
  const ref = useRef();
  const lineMat = new LineBasicMaterial( { color: 'white', side: DoubleSide } );
  const planeGeo = new PlaneGeometry(20,10,100,200)

  useEffect(() => {
    if (ref.current) {
      ref.current.rotation.x = Math.PI/2;
    }
  }, [])
  return (
    <lineSegments material={lineMat} geometry={planeGeo} rotation={[Math.PI/2, 0, 0]} position={[0,-2,0]}/>
  );
}
