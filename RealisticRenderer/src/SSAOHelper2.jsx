
import {SSAO} from '@react-three/postprocessing'
import { BlendFunction } from "postprocessing";

export default function SSAOHelper2() {

    return <>
        <SSAO
            blendFunction={BlendFunction.MULTIPLY}
            samples={100}
            radius={5}
            intensity={50}
            bias={0.5}
        />
    </>
}