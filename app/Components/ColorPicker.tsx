'use client'
import { use } from "react"
import { GradientContext } from "../Utils/ContextAPI"

import AngleSelector from "./AngleSelector";

export default function ColorPicker() {

    const gradientContainer = use(GradientContext);

    const modifyColors = (event: React.ChangeEvent<HTMLInputElement>) => {
        gradientContainer.updateGradientColors(parseInt(event.currentTarget.id), event.currentTarget.value);
    }

    const modifyColorStopsStop = (event: React.ChangeEvent<HTMLInputElement>) => {
        gradientContainer.updateGradientStopList(parseInt(event.currentTarget.id), parseFloat(event.currentTarget.value));
    }

    const modifyColorStopsStart = (event: React.ChangeEvent<HTMLInputElement>) => {
        gradientContainer.updateGradientStartList(parseInt(event.currentTarget.id), parseFloat(event.currentTarget.value));
    }

    const addColors = () => {
        let newColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
        gradientContainer.addColors(gradientContainer.currentGradient.colors.length, newColor);
    }

    const handleData = (angle: number, id?: number, startorstop?: "start" | "stop") => {
        if (startorstop === "stop"){
            gradientContainer.updateGradientStopList(id!, angle);
        } else if (startorstop === "start") {
            gradientContainer.updateGradientStartList(id!, angle);
        }
    }

    const subtractColors = () => {
        gradientContainer.subtractColors();
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
                    {gradientContainer.currentGradient.colors.map((color) => 
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
                            {(gradientContainer.currentGradient.type === "linear" ||  gradientContainer.currentGradient.type === "radial") &&
                            <>
                                <label htmlFor={color.index.toString() + "start"} className="px-2">Start:</label>
                                <input 
                                    type="number" 
                                    key={color.index + "start"}
                                    id={color.index.toString() + "start"} 
                                    name={color.index.toString() + "start"} 
                                    onChange={modifyColorStopsStart}
                                    min="0" max="100" defaultValue={gradientContainer.currentGradient.startList[color.index].pos}>
                                </input>
                                <label htmlFor={color.index.toString() + "end"} className="px-2">End:</label>
                                <input 
                                    type="number" 
                                    key={color.index + "end"}
                                    id={color.index.toString() + "end"} 
                                    name={color.index.toString() + "end"} 
                                    onChange={modifyColorStopsStop}
                                    min="0" max="100" defaultValue={gradientContainer.currentGradient.stopList[color.index].pos}>
                                </input>
                            </>}
                            {gradientContainer.currentGradient.type === "conic" &&
                            <>
                                <label>Start</label>
                                <AngleSelector 
                                    key={color.index + "start"}
                                    sendData={handleData}
                                    id={color.index}
                                    startorstop="start"
                                    defaultValue={gradientContainer.currentGradient.startList[color.index].pos}
                                >
                                </AngleSelector>
                                <label>Stop</label>
                                <AngleSelector 
                                    key={color.index + "end"}
                                    sendData={handleData}
                                    id={color.index}
                                    startorstop="stop"
                                    defaultValue={gradientContainer.currentGradient.stopList[color.index].pos}
                                >
                                </AngleSelector>
                            </>
                            }
                        </div>
                    )}
                    </fieldset>
                </div>  
            </div>
        </div>
    );
}
