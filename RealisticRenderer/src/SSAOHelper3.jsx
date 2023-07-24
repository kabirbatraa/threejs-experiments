
import { SSAO } from '@react-three/postprocessing'
import { BlendFunction } from "postprocessing";
import { useControls } from "leva";

export default function SSAOHelper3() {

    const config = useControls("SSAO", {
        // blendFunction: ,
        samples: {
            value: 10,
        },
        radius: 5,
        intensity: {
            value: 100,
        },
        bias: 0.5,
        
    });

    return <>
        <SSAO
            blendFunction={BlendFunction.MULTIPLY}
            // samples={100}
            // radius={5}
            // intensity={50}
            // bias={0.5}
            {...config}
        />
    </>
}