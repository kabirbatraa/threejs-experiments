import { useRef } from "react";
import SimulationMaterial from "./SimulationMaterial"
import { extend } from '@react-three/fiber'

extend({ SimulationMaterial: SimulationMaterial });

export default function Test() {

    const simulationMaterialRef = useRef()
    console.log(simulationMaterialRef)

    return <>
        <simulationMaterial ref={simulationMaterialRef} />
    </>
}