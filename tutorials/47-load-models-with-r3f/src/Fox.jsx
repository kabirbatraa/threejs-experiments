import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import { useControls } from "leva"

export default function Fox() {
    const fox = useGLTF('./Fox/glTF/Fox.gltf');
    const animations = useAnimations(fox.animations, fox.scene);

    // print all animation actions available
    // useAnimations automatically creates actions based on the animation clips
    // useAnimations also takes care of updating the animation each frame
    // console.log(animations.actions);
    // Walk, Survey, Run

    const { animationName } = useControls({
        animationName: {
            options: ["Survey", "Walk", "Run"]
        }
    })

    // only first render
    useEffect(() => {
        // const action = animations.actions.Run;
        const action = animations.actions[animationName];
        // reset to start animation at beginning, fade in and play
        action
            .reset()
            .fadeIn(0.5)
            .play();

        // called when the value changes
        return () => {
            // fade out will also stop the animation
            action.fadeOut(0.5);
        }

    }, [animationName])

    return <>
        <primitive 
            object={fox.scene}
            scale={0.02}
            position={[-2.5, 0, 2.5]}
            rotation-y={0.3}
        />
    </>
}