import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect } from "react";


export default function Fox() {
    const fox = useGLTF('./Fox/glTF/Fox.gltf');
    const animations = useAnimations(fox.animations, fox.scene);

    // print all animation actions available
    // useAnimations automatically creates actions based on the animation clips
    // useAnimations also takes care of updating the animation each frame
    console.log(animations.actions);
    // Walk, Survey, Run

    // only first render
    useEffect(() => {
        const action = animations.actions.Run;
        action.play();

        // wait 2 seconds before doing this
        window.setTimeout(() => {
            animations.actions.Walk.play();
            // action.stop();
            animations.actions.Walk.crossFadeFrom(animations.actions.Run, 1);
        }, 2000)

    } ,[])

    return <>
        <primitive 
            object={fox.scene}
            scale={0.02}
            position={[-2.5, 0, 2.5]}
            rotation-y={0.3}
        />
    </>
}