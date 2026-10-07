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
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <div className="flex flex-col">
                <button className="border-[2px] rounded-md px-[5px] shadow-md" onClick={()=>modifyColors("add")}>Add Color</button>
                <button className="border-[2px] rounded-md px-[5px] shadow-md" onClick={()=>modifyColors("subtract")}>Remove Color</button>
                <div>
                    <fieldset>
                    {colors.map((color) => 
                        <div key={color.id + "color"}>
                            <input type="color" key={color.id + "color"} id={color.id.toString()} defaultValue={color.color} name={color.id.toString()}/>
                            <label htmlFor={color.id.toString()} key={color.id +"label"}>Color {color.id}</label>
                        </div>
                    )}
                    </fieldset>
                </div>  
            </div>
        </div>
    );
}
