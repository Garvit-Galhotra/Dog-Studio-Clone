import { useEffect } from "react";
import * as THREE from "three";
import { useGLTF, useTexture, useAnimations } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

const Dog = () => {
  useThree(({ camera, gl }) => {
    camera.position.z = 0.5;
    gl.toneMapping = THREE.ReinhardToneMapping;
    gl.outputColorSpace = THREE.SRGBColorSpace;
  });

  const model = useGLTF("/models/dog.drc.glb");

  const [normalMap, dogSampleMatCap] = useTexture([
    "/dog_normals.jpg",
    "/matcap/mat-2.png",
  ]).map((texture) => {
    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  });

  const [branchDiffuseMap, branchNormalMap] = useTexture([
    "/branches_diffuse.jpg",
    "/branches_normals.jpg",
  ]).map((texture) => {
    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  });

  const dogMaterial = new THREE.MeshMatcapMaterial({
    normalMap: normalMap,
    matcap: dogSampleMatCap,
  });

  const branchMaterial = new THREE.MeshMatcapMaterial({
    normalMap: branchNormalMap,
    map: branchDiffuseMap,
  });

  model.scene.traverse((child) => {
    if (child.name.includes("DOG")) {
      child.material = dogMaterial;
    } else {
      child.material = branchMaterial;
    }
  });

  const dogAnimation = useAnimations(model.animations, model.scene);

  useEffect(() => {
    dogAnimation.actions["Take 001"].play();
  }, [dogAnimation.actions]);

  return (
    <>
      <primitive
        object={model.scene}
        position={[0.25, -0.55, 0]}
        rotation={[0, Math.PI / 5.5, 0]}
        scale={[1, 1, 1]}
      />
      <directionalLight position={[0, 5, 5]} color={0xffffff} intensity={10} />
    </>
  );
};

export default Dog;
