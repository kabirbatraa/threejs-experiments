
import {SSAO} from '@react-three/postprocessing'
import { useControls } from "leva";
import { BlendFunction } from "postprocessing";

export default function SSAOHelper() {


    const config = useControls("SSAO", {
        // blendFunction: ,
        samples: 10,
        radius: 5,
        intensity: 20,
        bias: 0.5
    });

    return <>
        <SSAO
            blendFunction={BlendFunction.MULTIPLY}
            {...config}
        />
    </>
}