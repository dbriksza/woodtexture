'use client'
import { use, useRef, useEffect } from "react"
import { GradientContext } from "../Utils/ContextAPI"

import ToolTip from "./ToolTip";

export default function GradientSelect() {

    const gradientContainer = use(GradientContext);

    const gradientContainerDiv = useRef<HTMLDivElement>(null);

    const changeCurrentGradient = (event: React.MouseEvent<HTMLDivElement>) => {
        gradientContainer.changeCurrentGradient(parseInt(event.currentTarget.dataset.value!));
    }

    const addGradient = () => {
        gradientContainer.addGradient();
    }

    const draggingItem = useRef<HTMLDivElement>(null);
    const dragOverItem = useRef<HTMLDivElement>(null);

    const dragStart = (event: React.MouseEvent<HTMLDivElement>) => {
        draggingItem.current = event.currentTarget;
    }

    const dragEnter = (event: React.MouseEvent<HTMLDivElement>) => {
        dragOverItem.current = event.currentTarget;
    }

    const drop = () => {

        console.log(draggingItem.current?.dataset.currentIndex, dragOverItem.current?.dataset.currentIndex)

        const from = parseInt(draggingItem.current?.dataset.currentIndex ?? "0");

        const to = parseInt(dragOverItem.current?.dataset.currentIndex ?? "0");

        gradientContainer.moveItem(from, to)

        draggingItem.current = null;
        dragOverItem.current = null;
    }

    useEffect(() => {
        gradientContainerDiv.current!.dataset.value = (gradientContainer.gradients.length - 1).toString();
        gradientContainer.changeCurrentGradient(gradientContainer.gradients.length - 1);
    }, [gradientContainer.gradients.length])

    const isCurrent = (value: number) => {
        return gradientContainer.currentGradient.id === value;
    }

    return (
        <div>
            <button className="border-[2px] rounded-md px-[5px] shadow-md my-2" onClick={addGradient}>
                    Add Gradient
                    <ToolTip helpText="Add a new gradient to edit"></ToolTip>
            </button>
            <div ref={gradientContainerDiv} id="gradientSelect" className="border p-2 m-2 w-[150px]">
                <ToolTip helpText="Reorder Gradients by dragging and dropping them. The top most gradient in the list is on top of all other gradients, so you may have to change opacity to see underlying gradients. The current Gradient is highlighted"></ToolTip>
                {gradientContainer.gradients.map((gradient, index) => 
                    <div key={index} data-value={gradient.id} data-current-index={index} onClick={changeCurrentGradient} 
                    className={isCurrent(gradient.id) ? "border w-[100px]" : ""}
                    onDragStart={dragStart}
                    onDragEnter={dragEnter}
                    onDrop={drop}
                    onDragOver={(e) => e.preventDefault()} draggable>
                        Gradient {gradient.id}
                    </div>
                )}
            </div>
        </div>
    )
}