import { useEffect, useRef } from "react";
import { DoubleSide, MeshStandardMaterial, Vector4 } from "three";

export function Plane(props) {
  const ref = useRef();
  const material = new MeshStandardMaterial();
  material.wireframe = true;

  useEffect(() => {
    if (ref.current) {
      ref.current.rotation.x = Math.PI/2;
    }
  }, [])
  return (
    <mesh ref={ref} position={[0,-2,0]} material={material}>
        <planeGeometry args={[20,10,100,200]}/>
    </mesh>
  );
}
