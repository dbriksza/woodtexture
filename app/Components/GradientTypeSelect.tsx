'use client'
import { use } from "react"
import { GradientContext } from "../Utils/ContextAPI"

import DirectionSelect from "./DirectionSelect";
import RadialProperties from "./RadialProperties";

export default function GradientTypeSelect() {

    const gradientContainer = use(GradientContext);

    const changeGradientType = (event: React.ChangeEvent<HTMLInputElement>) => {
        gradientContainer.updateGradientType(event.currentTarget.value);
    }

    return (
        <div className="flex flex-row justify-around">
            <fieldset className="flex flex-col min-w-[100px]">
                <p>Select Gradient Type:</p>
                <label>
                    <input type="radio" name="gradientType" value="linear" onChange={changeGradientType} checked={gradientContainer.currentGradient.type === "linear"}/> Linear
                </label>
                <label>
                    <input type="radio" name="gradientType" value="radial" onChange={changeGradientType} checked={gradientContainer.currentGradient.type === "radial"}/> Radial
                </label>
                <label>
                    <input type="radio" name="gradientType" value="conic" onChange={changeGradientType} checked={gradientContainer.currentGradient.type === "conic"}/> Conic
                </label>
            </fieldset>
            <div className="min-w-[300px]">
                <DirectionSelect/>
            </div>
            <RadialProperties/>
        </div>
    )
}