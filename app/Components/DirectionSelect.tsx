'use client'
import AngleSelector from './HelperComponents/AngleSelector';
import { use } from 'react';
import { GradientContext } from "../Utils/ContextAPI"

export default function DirectionSelect() {

    const gradientContainer = use(GradientContext);

    const handleData = (angle: number) => {
        gradientContainer.updateGradientAngle(angle);
    }

    return (
        <>{gradientContainer.currentGradient.type === "linear" &&
            <div className="max-w-[400px]">
                <AngleSelector sendData={handleData} value={gradientContainer.currentGradient.angle}/>
            </div>
        }</>
    )
}