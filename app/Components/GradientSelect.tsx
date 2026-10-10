'use client'
import { use } from "react"
import { GradientContext } from "../Utils/ContextAPI"

export default function GradientSelect() {

    const gradientContainer = use(GradientContext);

    const changeGradientType = (event: React.ChangeEvent<HTMLInputElement>) => {
        gradientContainer.updateGradientType(event.currentTarget.value);
    }

    return (
        <div>
            <fieldset className="flex flex-col">
                <label>
                    <input type="radio" name="gradientType" value="linear" onChange={changeGradientType} defaultChecked/> Linear
                </label>
                <label>
                    <input type="radio" name="gradientType" value="radial" onChange={changeGradientType}/> Radial
                </label>
                <label>
                    <input type="radio" name="gradientType" value="conic" onChange={changeGradientType}/> Conic
                </label>
            </fieldset>
        </div>
    )
}