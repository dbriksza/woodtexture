'use client'
import { use, useRef, useEffect } from "react"
import { GradientContext } from "../Utils/ContextAPI"

export default function GradientSelect() {

    const gradientContainer = use(GradientContext);

    const dropdown = useRef<HTMLSelectElement>(null);

    const changeCurrentGradient = (event: React.ChangeEvent<HTMLSelectElement>) => {
        gradientContainer.changeCurrentGradient(parseInt(event.currentTarget.value));
    }

    const addGradient = () => {
        gradientContainer.addGradient()
    }

    useEffect(() => {
        dropdown.current!.value = (gradientContainer.gradients.length - 1).toString();
        gradientContainer.changeCurrentGradient(gradientContainer.gradients.length - 1)
    }, [gradientContainer.gradients.length])

    return (
        <div>
            <button className="border-[2px] rounded-md px-[5px] shadow-md my-2" onClick={addGradient}>
                    Add Gradient
            </button>
            <select ref={dropdown} onChange={changeCurrentGradient} id="gradientSelect">
                {gradientContainer.gradients.map((gradient, index) => 
                    <option key={index} value={index}>Gradient {index}</option>
                )}
            </select>
        </div>
    )
}