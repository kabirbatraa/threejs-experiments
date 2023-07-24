
import {SSAO} from '@react-three/postprocessing'
import { useControls } from "leva";
import { BlendFunction } from "postprocessing";

export default function SSAOHelper({ callbackFunction }) {

    

    const config = useControls("SSAO", {
        // blendFunction: ,
        samples: {
            value: 10,
            onChange: (v) => {
                // imperatively update the world after Leva input changes
                console.log('hi')
                callbackFunction();
            },
        },
        radius: 5,
        intensity: {
            value: 100,
            onChange: (v) => {
                // imperatively update the world after Leva input changes
                console.log('onchange:', v)
                callbackFunction();
            },
        },
        bias: 0.5,
        
    });

    return <>
        <SSAO
            blendFunction={BlendFunction.MULTIPLY}
            {...config}
        />
    </>
}