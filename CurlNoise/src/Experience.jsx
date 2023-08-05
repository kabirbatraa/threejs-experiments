import { useFrame } from '@react-three/fiber'
import { 
    OrbitControls,
} from '@react-three/drei'
import { Perf } from 'r3f-perf'
import TutorialParticles from './TutorialParticles'

export default function Experience() {

    useFrame((state, delta) => {
        
    })

    // const count = 9001;
    const count = 9001;

    return <>

        {/* <Perf position="top-left" /> */}
        <OrbitControls makeDefault />
        {/* <OrbitControls autoRotate /> */}

        <TutorialParticles count={count} />

    </>
}