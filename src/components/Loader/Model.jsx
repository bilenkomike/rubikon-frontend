import { Center } from "@react-three/drei";
import { forwardRef } from "react";

const Model = forwardRef(function Model({ scene, visible = true }, ref) {
  return (
    <group ref={ref} visible={visible}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
});

export default Model;
