'use client'
import { useState } from 'react';

export default function ColorPicker() {

    interface ColorPicker {
        id: number;
        color: string;
    }

    const modifyColors = (action: string) => {
        console.log(action, colors.length)
        switch (action) {
            case "add":
                const newColorInput = {id:colors.length + 1, color:"#fc7c03"}
                setColors(prevItems => [...prevItems, newColorInput]);
                break;
            case "subtract":
                setColors(prevItems => {
                    const newItems = [...prevItems];
                    newItems.pop();
                    return newItems;
                });
                break;
            default:
                break;
        }
    }

    const [colors, setColors] = useState<ColorPicker[]>([]);

    return (
        <div className="flex flex-col bg-zinc-50 font-sans dark:bg-black">
            <div className="flex flex-col">
                <button className="border-[2px] rounded-md px-[5px] shadow-md my-2" onClick={()=>modifyColors("add")}>Add Color</button>
                <button className="border-[2px] rounded-md px-[5px] shadow-md my-2" onClick={()=>modifyColors("subtract")}>Remove Color</button>
                <div>
                    <fieldset>
                    {colors.map((color) => 
                        <div key={color.id + "colorContainer"} className="border-b shadow-md mb-2">
                            <label htmlFor={color.id.toString() + "color"} key={color.id +"label"} className="w-[7ch] block">Color {color.id}: </label>
                            <input 
                                type="color" 
                                key={color.id + "color"} 
                                id={color.id.toString() + "color"}  
                                name={color.id.toString() + "color"}
                                defaultValue={color.color}
                            />

                            <label htmlFor={color.id.toString() + "start"} className="px-2">Start:</label>
                            <input 
                                type="number" 
                                key={color.id + "start"}
                                id={color.id.toString() + "start"} 
                                name={color.id.toString() + "start"} 
                                min="0" max="100" defaultValue="0">
                            </input>
                            <label htmlFor={color.id.toString() + "end"} className="px-2">End:</label>
                            <input 
                                type="number" 
                                key={color.id + "end"}
                                id={color.id.toString() + "end"} 
                                name={color.id.toString() + "end"} 
                                min="0" max="100" defaultValue="0">
                            </input>
                        </div>
                    )}
                    </fieldset>
                </div>  
            </div>
        </div>
    );
}
