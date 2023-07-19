import { forwardRef } from 'react'
import DrunkEffect from './DrunkEffect'

export default forwardRef(function Drunk(props, ref) {
    
    // obtain props from EffectComposer, forward them to Drunk Effect
    const effect = new DrunkEffect(props);

    return <primitive ref={ref} object={effect} />
})