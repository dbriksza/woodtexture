'use client'
import { use, useEffect, useRef } from "react"
import { GradientContext } from "../Utils/ContextAPI"

export default function RadialProperties() {

    const gradient = use(GradientContext);

    const xref = useRef<HTMLInputElement>(null);

    const yref = useRef<HTMLInputElement>(null);

    const xrefe = useRef<HTMLInputElement>(null);

    const yrefe = useRef<HTMLInputElement>(null);

    const changeRadialShape = (event: React.ChangeEvent<HTMLInputElement>) => {
        gradient.updateGradientShape(event.currentTarget.value);
    }

    const changeRadialSize = (event: React.ChangeEvent<HTMLInputElement>) => {
        gradient.updateGradientSize(event.currentTarget.value);
    }

    const changeRadialPosition = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.currentTarget.name === "radialPositionX"){ 
            gradient.updateGradientPosition("x", parseInt(event.currentTarget.value));
        } else if (event.currentTarget.name === "radialPositionY") {
            gradient.updateGradientPosition("y", parseInt(event.currentTarget.value));
        }
    }

    const changeRadialShapeSize = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.currentTarget.name === "ellipseSizeX"){ 
            gradient.updateGradientShapeSize("x", parseInt(event.currentTarget.value));
        } else if (event.currentTarget.name === "ellipseSizeY") {
            gradient.updateGradientShapeSize("y", parseInt(event.currentTarget.value));
        }
    }

    useEffect(() => {
        if(gradient.gradient.type === "radial"){
            xref.current!.value = gradient.gradient.position.x.toString();
            yref.current!.value = gradient.gradient.position.y.toString();
            if(gradient.gradient.shape === "ellipse"){
                xrefe.current!.value = gradient.gradient.shapeSize.x.toString();
                yrefe.current!.value = gradient.gradient.shapeSize.y.toString();
            }
        }
    },[gradient.gradient.position, gradient.gradient.type])

    return (
        <>{gradient.gradient.type === "radial" &&
            <div className="flex flex-col">
                <fieldset className="flex flex-col border-[2px] rounded p-2 my-4">
                    <div className="flex flex-col w-[40%]">
                        <label>
                            <input type="radio" name="radialShape" value="circle" onChange={changeRadialShape} defaultChecked/> Circle
                        </label>
                        <label>
                            <input type="radio" name="radialShape" value="ellipse" onChange={changeRadialShape}/> ellipse
                        </label>
                    </div>
                </fieldset>
                <fieldset className="flex flex-col border-[2px] rounded p-2 my-4">
                    {gradient.gradient.shape === "circle" && 
                        <div className="flex flex-col">
                            <label>
                                <input type="radio" name="radialSize" value="closest-side" onChange={changeRadialSize} defaultChecked/> Closest-Side
                            </label>
                            <label>
                                <input type="radio" name="radialSize" value="farthest-side" onChange={changeRadialSize}/> Farthest-Side
                            </label>
                            <label>
                                <input type="radio" name="radialSize" value="closest-corner" onChange={changeRadialSize}/> Closest-Corner
                            </label>
                            <label>
                                <input type="radio" name="radialSize" value="farthest-corner" onChange={changeRadialSize}/> Farthest-Corner
                            </label>
                        </div>
                    }
                    {gradient.gradient.shape === "ellipse" && 
                        <div>
                            <label><input ref={xrefe} type="number" name="ellipseSizeX" min="0" onChange={changeRadialShapeSize}/>Position X</label>
                            <label><input ref={yrefe} type="number" name="ellipseSizeY" min="0" onChange={changeRadialShapeSize}/>Position Y</label>
                        </div>
                    }
                </fieldset>
                <div className="border-[2px] rounded p-2 my-4">
                    <label><input ref={xref} type="number" name="radialPositionX" min="0" onChange={changeRadialPosition}/>Position X</label>
                    <label><input ref={yref} type="number" name="radialPositionY" min="0" onChange={changeRadialPosition}/>Position Y</label>
                </div>
            </div>
        }</>
    )
}