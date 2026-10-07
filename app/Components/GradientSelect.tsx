'use client'
import { useState } from 'react';

export default function GradientSelect() {

    const [gradient, setGradient] = useState<Gradient>({type: "linear", repeating: false})

    const changeGradientType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGradient((prevGradient) => ({...prevGradient, type: event.currentTarget?.value}))
    }

    return (
        <fieldset onChange={() => changeGradientType}>
            <label>
                <input type="radio" name="gradientType" value="linear"/> Linear
            </label>
            <label>
                <input type="radio" name="gradientType" value="radial"/> Radial
            </label>
            <label>
                <input type="radio" name="gradientType" value="conic"/> Conic
            </label>
        </fieldset>
    )
}