'use client'
import { use } from "react"
import { GradientContext } from "../Utils/ContextAPI"

import AngleSelector from "./HelperComponents/AngleSelector";
import ToolTip from "./HelperComponents/ToolTip";

export default function ColorPicker() {

    const gradientContainer = use(GradientContext);

    const modifyColors = (event: React.ChangeEvent<HTMLInputElement>) => {
        gradientContainer.updateGradientColors(parseInt(event.currentTarget.id), event.currentTarget.value);
    }

    const modifyColorsAlpha = (event: React.ChangeEvent<HTMLInputElement>) => { 
        let alpha = Math.floor((parseInt(event.currentTarget.value) / 100) * 255).toString(16).padStart(2, '0');
        gradientContainer.updateGradientColorsAlpha(parseInt(event.currentTarget.id), alpha);
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

    const normalize = () => {
        gradientContainer.normalizeStartStop();
    }

    const entireGradientAlpha = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.currentTarget.value)
        let alpha = Math.floor((parseInt(event.currentTarget.value) / 100) * 255).toString(16).padStart(2, '0');
        gradientContainer.setAllAlpha(alpha);
    }

    const addSpaceBetween = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget)
        let space = Object.fromEntries(data.entries()).spaceBetween;
        gradientContainer.addSpaceBetweenStops(parseInt(space as string))
    }

    const removeSpaceBetween = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget)
        let space = Object.fromEntries(data.entries()).spaceBetween;
        gradientContainer.addSpaceBetweenStops(-parseInt(space as string))
    }

    const shiftStops = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget)
        let space = Object.fromEntries(data.entries()).spaceBetween;
        gradientContainer.shiftStops(parseInt(space as string))
    }

    const changeUnit = (event: React.ChangeEvent<HTMLInputElement>) => {
        gradientContainer.changeUnits(event.currentTarget.value);
    }

    const changeRepeating = (event: React.ChangeEvent<HTMLInputElement>) => {
        gradientContainer.updateRepeating(JSON.parse(event.currentTarget.value));
    }

    const mapColors = (): React.ReactNode => {
        return gradientContainer.currentGradient.colors.map((color) => 
            <div key={color.id + "colorContainer" + gradientContainer.currentGradient.id} className="mb-2 before:absolute before:right-[-300px] before:border-b">
                <label 
                    htmlFor={color.id.toString() + "color" + gradientContainer.currentGradient.id} 
                    key={color.id +"label" + gradientContainer.currentGradient.id} 
                    className="w-[7ch] block"
                >
                    Color {color.id}: 
                </label>
                <input 
                    type="color"
                    key={color.id + "color" + gradientContainer.currentGradient.id} 
                    id={color.id.toString() + "color" + gradientContainer.currentGradient.id}  
                    name={color.id.toString() + "color" + gradientContainer.currentGradient.id}
                    value={color.color}
                    onChange={modifyColors}
                />
                <label 
                    htmlFor={color.id.toString() + "colorAlpha" + gradientContainer.currentGradient.id} 
                    key={color.id + "labelAlpha"} 
                    className="w-[7ch] block">
                    Alpha
                </label>
                <input 
                    type="range"
                    key={color.id + "colorAlpha" + gradientContainer.currentGradient.id} 
                    id={color.id.toString() + "colorAlpha" + gradientContainer.currentGradient.id}  
                    name={color.id.toString() + "colorAlpha" + gradientContainer.currentGradient.id}
                    min={0}
                    max={100}
                    value={(parseInt(color.alpha, 16) / 255) * 100}
                    onChange={modifyColorsAlpha}>
                </input>
            </div>
        )
    }

    const mapStarts = (): React.ReactNode => {
        if(gradientContainer.currentGradient.type === "linear" ||  gradientContainer.currentGradient.type === "radial"){
            return (
                gradientContainer.currentGradient.startList.map((start) => 
                <div key={start.id + "colorStart" + gradientContainer.currentGradient.id} className="border-b mb-2">
                    <label htmlFor={start.id.toString() + "start" + gradientContainer.currentGradient.id} className="px-2">Start:</label>
                    <input 
                        type="number" 
                        key={start.id + "start" + gradientContainer.currentGradient.id}
                        id={start.id.toString() + "start" + gradientContainer.currentGradient.id} 
                        name={start.id.toString() + "start" + gradientContainer.currentGradient.id} 
                        onChange={modifyColorStopsStart}
                        min="0" max="100" value={start.pos}>
                    </input>
                </div>
                )
            )
        } else if(gradientContainer.currentGradient.type === "conic"){
            return (
                gradientContainer.currentGradient.startList.map((start) => 
                <div key={start.id + "colorStop" + gradientContainer.currentGradient.id} className="border-b mb-2">
                    <label>Start</label>
                    <AngleSelector 
                        key={start.id + "start" + gradientContainer.currentGradient.id}
                        sendData={handleData}
                        id={start.id.toString() + gradientContainer.currentGradient.id}
                        startorstop="start"
                        value={start.pos}
                    >
                    </AngleSelector>
                </div>
                )
            )
        } else {
            return (
                <></>
            )
        }
    }

    const mapStops = (): React.ReactNode => {
        if(gradientContainer.currentGradient.type === "linear" ||  gradientContainer.currentGradient.type === "radial") {
            return(
                gradientContainer.currentGradient.stopList.map((stop) => 
                <div key={stop.id + "colorStop" + gradientContainer.currentGradient.id} className="border-b mb-2">
                    <label htmlFor={stop.id.toString() + "end" + gradientContainer.currentGradient.id} className="px-2">End:</label>
                    <input 
                        type="number" 
                        key={stop.id + "end" + gradientContainer.currentGradient.id}
                        id={stop.id.toString() + "end" + gradientContainer.currentGradient.id} 
                        name={stop.id.toString() + "end" + gradientContainer.currentGradient.id} 
                        onChange={modifyColorStopsStop}
                        min="0" max="100" value={stop.pos}>
                    </input>
                </div>
                )
            )
        } else if (gradientContainer.currentGradient.type === "conic"){
            return (
                gradientContainer.currentGradient.stopList.map((stop) => 
                <div key={stop.id + "colorStop" + gradientContainer.currentGradient.id} className="border-b mb-2">
                    <label>Stop</label>
                    <AngleSelector 
                        key={stop.id + "stop" + gradientContainer.currentGradient.id}
                        sendData={handleData}
                        id={stop.id.toString() + gradientContainer.currentGradient.id}
                        startorstop="stop"
                        value={stop.pos}
                    >
                    </AngleSelector>
                </div>
                )
            )
        } else {
            return (
                <></>
            )
        }
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
                <button className="border-[2px] rounded-md px-[5px] shadow-md my-2" onClick={normalize}>
                    Normalize Starts/Stops
                    <ToolTip helpText="Sets all Stops/Starts to be evenly spaced and to fill entire container"></ToolTip>
                </button>
                <label 
                    htmlFor="allAlpha">
                    Set All Alpha
                    <ToolTip helpText="Sets Alpha for all colors on this gradient. If the colors have different values, this slider will show the highest value."></ToolTip>
                </label>
                <input 
                    type="range" 
                    name="allAlpha"
                    id="allAlpha"
                    min={0}
                    max={100}
                    value={(Math.max(...gradientContainer.currentGradient.colors.map(color => parseInt(color.alpha, 16))) / 255) * 100}
                    onChange={entireGradientAlpha}>
                </input>
                <form onSubmit={addSpaceBetween}>
                    <label 
                        className="pr-[1rem]"
                        htmlFor="spaceBetween">
                        Add Space Between Stops:
                    </label>
                    <input 
                        type="number" 
                        name="spaceBetween"
                        id="spaceBetween"
                        min={0}
                        max={100}
                        defaultValue={0}>
                    </input>
                    <button type="submit" className="border-[2px] rounded-md px-[5px] shadow-md my-2">Add Space</button>
                </form>
                <form onSubmit={removeSpaceBetween}>
                    <label 
                        className="pr-[1rem]"
                        htmlFor="spaceBetween">
                        Reduce Space Between Stops:
                    </label>
                    <input 
                        type="number" 
                        name="spaceBetween"
                        id="spaceBetween"
                        min={0}
                        max={100}
                        defaultValue={0}>
                    </input>
                    <button type="submit" className="border-[2px] rounded-md px-[5px] shadow-md my-2">Reduce Space</button>
                </form>
                <form onSubmit={shiftStops}>
                    <label 
                        className="pr-[1rem]"
                        htmlFor="spaceBetween">
                        Shift All Stops:
                    </label>
                    <input 
                        type="number" 
                        name="spaceBetween"
                        id="spaceBetween"
                        min={-100}
                        max={100}
                        defaultValue={0}>
                    </input>
                    <button type="submit" className="border-[2px] rounded-md px-[5px] shadow-md my-2">
                        Shift Stops 
                        <ToolTip helpText="Shifts all stops. Use negative values for the opposite direction."></ToolTip>
                    </button>
                </form>
                <fieldset className="my-2">
                    <p>Units: </p>
                    <label className="mr-4">
                        <input type="radio" name="unit" value="%" onChange={changeUnit} checked={gradientContainer.currentGradient.units === "%"}/> Percent
                    </label>
                    <label>
                        <input type="radio" name="unit" value="px" onChange={changeUnit} checked={gradientContainer.currentGradient.units === "px"}/> px
                    </label>
                </fieldset>
                <fieldset className="my-2">
                    <p>Repeating: </p>
                    <label className="mr-4">
                        <input type="radio" name="repeat" value="true" onChange={changeRepeating} checked={gradientContainer.currentGradient.repeating}/> Repeating
                    </label>
                    <label>
                        <input type="radio" name="repeat" value="false" onChange={changeRepeating} checked={!gradientContainer.currentGradient.repeating}/> Non-Repeating
                    </label>
                </fieldset>
                <div>
                    <fieldset className="flex flex-row justify-between">
                        <div className="flex flex-col justify-around max-w-[33%]">
                        {mapColors()}
                        </div>
                        <div className="flex flex-col justify-around max-w-[33%]">
                            {mapStarts()}
                        </div>
                        <div className="flex flex-col justify-around max-w-[33%]">
                            {mapStops()}
                        </div>
                    </fieldset>
                </div>  
            </div>
        </div>
    );
}
