'use client'
import AngleSelector from './AngleSelector';
import { useState, useRef, useEffect, use } from 'react';
import { GradientContext } from "../Utils/ContextAPI"

export default function DirectionSelect() {

    const gradientContainer = use(GradientContext);

    const handleData = (angle: number) => {
        gradientContainer.updateGradientAngle(angle);
    }

    return (
        <>{gradientContainer.currentGradient.type === "linear" &&
            <AngleSelector sendData={handleData}/>
        }</>
    )
}