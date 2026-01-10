import React from "react";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

const Dog = () => {
  useThree(({ camera }) => {
    console.log(camera.position);
    camera.position.z = 0.5;
  });

  const model = useGLTF("/models/dog.drc.glb");

  return (
    <>
      <primitive
        object={model.scene}
        position={[0.25, -0.55, 0]}
        rotation={[0, Math.PI / 5.5, 0]}
        scale={[1, 1, 1]}
      />
      <directionalLight position={[0, 5, 5]} color={0xffffff} intensity={10} />
      {/* <OrbitControls /> */}
    </>
  );
};

export default Dog;
