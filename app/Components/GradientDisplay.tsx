'use client'
import { use } from "react"
import { GradientContext } from "../Utils/ContextAPI"

export default function GradientSelect() {

    const gradient = use(GradientContext);

    const changeGradientType = (event: React.ChangeEvent<HTMLInputElement>) => {
        gradient.updateGradientType(event.currentTarget.value);
    }

    return (
        <div>
            <fieldset onChange={() => changeGradientType} className="flex flex-col">
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
        </div>
    )
}