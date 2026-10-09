'use client'
import { useState, useRef } from 'react';
import { use } from "react"
import { GradientContext } from "../Utils/ContextAPI"

export default function DirectionSelect() {

    const gradient = use(GradientContext);

    // const [direction, setDirection] = useState<Gradient>({type: "linear", repeating: false})

    interface XY {
        x: number;
        y: number;
    }

    const [xy, setXY] = useState<XY>({x: 100, y: 0});

    const [angle, setAngle] = useState<number>(90);

    const customAngleRef = useRef<HTMLInputElement>(null);

    const changeDirectionRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
        switch (event.currentTarget.value) {
            case "up":
                setXY({x: 100, y: 0})
                setAngle(90);
                break;
            case "right":
                setXY({x: 200, y: 100})
                setAngle(0);
                break;
            case "down":
                setXY({x: 100, y: 200})
                setAngle(-90);
                break;
            case "left":
                setXY({x: 0, y: 100})
                setAngle(180);
                break;
            case "custom":
                break;
            default:
                break;
        }
        gradient.updateGradientAngle(angle.toString());
    }

    const changeDirectionCircle = (event: React.MouseEvent<SVGGraphicsElement, MouseEvent>) => {
        customAngleRef.current!.click();

        let rect1 = event.currentTarget.getBoundingClientRect();

        const x1 = 50;
        const y1 = 50;

        let x2 = event.clientX - rect1.left;
        let y2 = event.clientY - rect1.top;

        let angle = -1 * (Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI));

        setAngle(angle);

        setXY({x: x2 + x1, y: y2 + y1});

        gradient.updateGradientAngle(angle.toString());

    }

    return (
        <div>
            <fieldset className="relative w-[100px] h-[100px]">
                <svg viewBox="50 50 100 100" xmlns="http://www.w3.org/2000/svg" onClick={changeDirectionCircle}>
                    <circle cx="100" cy="100" r="50" />
                    <line x1="100" y1="100" x2={xy.x} y2={xy.y} stroke="red" strokeWidth="2" />
                </svg>
                <label className="absolute bottom-[105%] right-[-43%] w-[100px] mb-[-.4em]">
                    <input type="radio" name="angle" value="up" onChange={changeDirectionRadio}/> Up
                </label>
                <label className="absolute left-[105%] top-[calc(50%-10px)] h-[10px]">
                    <input type="radio" name="angle" value="right" onChange={changeDirectionRadio}/> Right
                </label>
                <label className="absolute top-[105%] right-[-43%] w-[100px]">
                    <input type="radio" name="angle" value="down" onChange={changeDirectionRadio}/> Down
                </label>
                <label className="absolute right-[105%] top-[calc(50%-10px)] h-[10px] text-right">
                    <input type="radio" name="angle" value="left" onChange={changeDirectionRadio}/> Left
                </label>
                <input ref={customAngleRef} className="" type="radio" name="angle" value="customAngle" onChange={changeDirectionRadio}/>
            </fieldset>
            <br></br>
            <span className="block max-w-[100px] w-[100px]">Angle: {angle}</span>
        </div>
    )
}