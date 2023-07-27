
import { SSAO } from '@react-three/postprocessing'
import { BlendFunction } from "postprocessing";
import { useControls } from "leva";

export default function SSAOHelper4({callbackFunction}) {

    const config = useControls("SSAO", {
        // blendFunction: ,
        samples: {
            value: 20,
        },
        radius: 5,
        intensity: {
            value: 20,
            min: 0, 
            max: 150,
            onChange: (v) => {
                // console.log('hi')

                // on change of this value, update parent component
                callbackFunction();
            },
            // need to set transient to false so that intensity is still returned in config
            transient: false,
        },
        bias: 0.5,
        
    });

    // callbackFunction(); // infinite loop

    // console.log(config) 

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