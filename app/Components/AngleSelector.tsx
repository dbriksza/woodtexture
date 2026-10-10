'use client'
import { useState, useRef, useEffect } from 'react';

type AngleSelectorProps = {
    sendData: (angle: number, id?: number, startorstop?: "start" | "stop") => void;
    defaultValue?: number;
    id?: number;
    startorstop?: "start" | "stop"
}

const AngleSelector: React.FC<AngleSelectorProps> = (({sendData, defaultValue, id, startorstop}) => {

    interface XY {
        x: number;
        y: number;
    }

    const [xy, setXY] = useState<XY>({x: 100, y: 0});

    const [angle, setAngle] = useState<number>(defaultValue? defaultValue : 0);

    const customAngleRef = useRef<HTMLInputElement>(null);

    const changeDirectionRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
        switch (event.currentTarget.value) {
            case "up":
                setXY({x: 100, y: 0})
                setAngle(0 * (Math.PI));
                break;
            case "right":
                setXY({x: 200, y: 100})
                setAngle(.5 * (Math.PI));
                break;
            case "down":
                setXY({x: 100, y: 200})
                setAngle(1 * (Math.PI));
                break;
            case "left":
                setXY({x: 0, y: 100})
                setAngle(1.5 * (Math.PI));
                break;
            case "custom":
                break;
            default:
                break;
        }
    }

    const changeDirectionCircle = (event: React.MouseEvent<SVGGraphicsElement, MouseEvent>) => {
        customAngleRef.current!.click();

        let rect1 = event.currentTarget.getBoundingClientRect();

        const x1 = 50;
        const y1 = 50;

        let x2 = event.clientX - rect1.left;
        let y2 = event.clientY - rect1.top;

        let angle = (Math.atan2(y1 - y2, x1 - x2) - Math.PI/2);

        if (angle < 0) {
            angle += 2 * Math.PI;
        }

        setAngle(angle);

        setXY({x: x2 + x1, y: y2 + y1});
    }

    useEffect(() => {
        let x = 100 + 50 * Math.cos(angle - Math.PI/2);
        let y = 100 + 50 * Math.sin(angle - Math.PI/2);
        setXY({x, y})
        sendData(angle, id!, startorstop!);
    }, [angle])

    return (
        <div className="py-[2rem] pl-[4ch] flex flex-row items-center">
            <fieldset className="relative min-w-[100px] min-h-[100px]">
                <svg viewBox="50 50 100 100" xmlns="http://www.w3.org/2000/svg" onClick={changeDirectionCircle}>
                    <circle cx="100" cy="100" r="50" />
                    <line x1="100" y1="100" x2={xy.x} y2={xy.y} stroke="red" strokeWidth="2" />
                </svg>
                <label className="absolute bottom-[105%] right-[-43%] w-[100px] mb-[-.4em]">
                    <input type="radio" name="angle" value="up" onChange={changeDirectionRadio} defaultChecked/> Up
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
                <input 
                    ref={customAngleRef} 
                    className="hidden" type="radio" name="angle" value="customAngle" 
                    onChange={changeDirectionRadio}
                />
            </fieldset>
            <span className="block max-w-[100px] w-[100px] ml-[5rem]">Angle: {angle}</span>
        </div>
    )
})

export default AngleSelector;