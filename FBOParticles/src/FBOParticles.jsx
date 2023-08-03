import { createPortal, extend } from "@react-three/fiber";
import { useRef } from "react";

import * as THREE from 'three';

import SimulationMaterial from "./SimulationMaterial";
extend({ SimulationMaterial: SimulationMaterial });

export default function FBOParticles() {

    // number particles = textureSize^2
    const textureSize = 128;

    const points = useRef();
    const simulationMaterialRef = useRef();

    const scene = new THREE.Scene();
    // const camera 

    return <>
        {/* render off screen */}
        {createPortal(
            <mesh>
                <simulationMaterial />
            </mesh>,
            scene
        )}
    </>
}