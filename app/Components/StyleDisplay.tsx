'use client'
import { use, useState, useEffect } from "react"
import { GradientContext } from "../Utils/ContextAPI"

import ToolTip from "./ToolTip";

export default function StyleDisplay() {

    const gradientContainer = use(GradientContext);

    const [mouseDown, setMouseDown] = useState<boolean>(false);

    const [timer, setTimer] = useState<boolean>(false);

    const mosueUpEvent = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setMouseDown(false)
    }

    const mosueDownEvent = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setMouseDown(true)
    }

    const updatePosition = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        let rect1 = event.currentTarget.getBoundingClientRect();
        let w = event.currentTarget.offsetWidth;
        let h = event.currentTarget.offsetHeight;
        let x = event.clientX - rect1.left;
        let y = event.clientY - rect1.top;
        let xpercent = (x / w) * 100;
        let ypercent = (y / h) * 100;
        gradientContainer.updateGradientPosition("xy", xpercent, ypercent);
    }

    const updatePositionDrag = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if(mouseDown && timer){
            updatePosition(event);
        }
    }

    const updatePositionClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        updatePosition(event);
    }

    useEffect(() => {
        setTimeout(() => {
            setTimer(!timer)
        }, 10)
    }, [timer])

    return (
        <div>
            <ToolTip helpText="The CSS style is above, the rendered style is shown below"></ToolTip>
            <textarea className="min-h-[200px] min-w-[400px]" readOnly value={gradientContainer.style}></textarea>
            <div 
                className="h-[200px] w-[200px] resize max-h-[100vh] max-w-[100vw] border overflow-auto mb-[10vh]" 
                onClick={updatePositionClick}
                onMouseDown={mosueDownEvent} onMouseUp={mosueUpEvent} onMouseLeave={mosueUpEvent} onMouseMove={updatePositionDrag}
                style={{background: gradientContainer.style}}>
            </div>
        </div>
    )
}