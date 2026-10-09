'use client'
import { use, useState } from "react"
import { GradientContext } from "../Utils/ContextAPI"

export default function StyleDisplay() {

    const gradient = use(GradientContext);

    return (
        <div>
            <textarea readOnly value={gradient.style}></textarea>
            <div className="h-[200px] w-[200px]" style={{background: gradient.style}}></div>
        </div>
    )
}