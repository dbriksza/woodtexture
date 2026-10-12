'use client'
import AngleSelector from './AngleSelector';
import { use } from 'react';
import { GradientContext } from "../Utils/ContextAPI"

export default function DirectionSelect() {

    const gradientContainer = use(GradientContext);

    const handleData = (angle: number) => {
        gradientContainer.updateGradientAngle(angle);
    }

    return (
        <>{gradientContainer.currentGradient.type === "linear" &&
            <AngleSelector sendData={handleData} value={gradientContainer.currentGradient.angle}/>
        }</>
    )
}