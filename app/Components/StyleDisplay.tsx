'use client'
import { use, useState } from "react"
import { GradientContext } from "../Utils/ContextAPI"

export default function StyleDisplay() {

    const gradient = use(GradientContext);

    const updatePosition = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        let rect1 = event.currentTarget.getBoundingClientRect();
        let w = event.currentTarget.offsetWidth;
        let h = event.currentTarget.offsetHeight;
        let x = event.clientX - rect1.left;
        let y = event.clientY - rect1.top;
        let xpercent = (x / w) * 100;
        let ypercent = (y / h) * 100;
        gradient.updateGradientPosition("xy", xpercent, ypercent);
    }

    return (
        <div>
            <textarea readOnly value={gradient.style}></textarea>
            <div 
                className="h-[200px] w-[200px] resize max-h-[100vh] max-w-[100vw] border overflow-auto" 
                onClick={updatePosition}
                style={{background: gradient.style}}>
            </div>
        </div>
    )
}