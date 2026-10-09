'use client'
import { useState } from 'react';
import { use } from "react"
import { GradientContext } from "../Utils/ContextAPI"

export default function ColorPicker() {

    const gradient = use(GradientContext);

    const modifyColors = (event: React.ChangeEvent<HTMLInputElement>) => {
        gradient.updateGradientColors(parseInt(event.currentTarget.id), event.currentTarget.value);
    }

    const modifyColorStopsStop = (event: React.ChangeEvent<HTMLInputElement>) => {
        gradient.updateGradientStopList(parseInt(event.currentTarget.id), event.currentTarget.value);
    }
    const modifyColorStopsStart = (event: React.ChangeEvent<HTMLInputElement>) => {
        gradient.updateGradientStartList(parseInt(event.currentTarget.id), event.currentTarget.value);
    }

    const addColors = () => {
        let newColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
        gradient.addColors(gradient.gradient.colors.length, newColor);
    }

    const subtractColors = () => {
        gradient.subtractColors();
    }


    return (
        <div className="flex flex-col bg-zinc-50 font-sans dark:bg-black">
            <div className="flex flex-col">
                <button className="border-[2px] rounded-md px-[5px] shadow-md my-2" onClick={addColors}>
                    Add Color
                </button>
                <button className="border-[2px] rounded-md px-[5px] shadow-md my-2" onClick={subtractColors}>
                    Remove Color
                </button>
                <div>
                    <fieldset>
                    {gradient.gradient.colors.map((color) => 
                        <div key={color.index + "colorContainer"} className="border-b shadow-md mb-2">
                            <label 
                                htmlFor={color.index.toString() + "color"} 
                                key={color.index +"label"} 
                                className="w-[7ch] block"
                            >
                                Color {color.index}: 
                            </label>
                            <input 
                                type="color" 
                                key={color.index + "color"} 
                                id={color.index.toString() + "color"}  
                                name={color.index.toString() + "color"}
                                defaultValue={color.color}
                                onChange={modifyColors}
                            />

                            <label htmlFor={color.index.toString() + "start"} className="px-2">Start:</label>
                            <input 
                                type="number" 
                                key={color.index + "start"}
                                id={color.index.toString() + "start"} 
                                name={color.index.toString() + "start"} 
                                onChange={modifyColorStopsStart}
                                min="0" max="100" defaultValue={gradient.gradient.startList[color.index].start}>
                            </input>
                            <label htmlFor={color.index.toString() + "end"} className="px-2">End:</label>
                            <input 
                                type="number" 
                                key={color.index + "end"}
                                id={color.index.toString() + "end"} 
                                name={color.index.toString() + "end"} 
                                onChange={modifyColorStopsStop}
                                min="0" max="100" defaultValue={gradient.gradient.stopList[color.index].stop}>
                            </input>
                        </div>
                    )}
                    </fieldset>
                </div>  
            </div>
        </div>
    );
}
