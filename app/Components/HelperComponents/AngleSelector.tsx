'use client'
import { useState, useRef, useEffect, InputHTMLAttributes, useCallback, use } from 'react';

interface AngleSelectorProps extends  InputHTMLAttributes<HTMLInputElement> {
    sendData: (angle: number, id?: number, startorstop?: "start" | "stop") => void;
    defaultValue?: number;
    startorstop?: "start" | "stop"
}

const AngleSelector: React.FC<AngleSelectorProps> = (({sendData, id, startorstop, value}) => {

    interface XY {
        x: number;
        y: number;
    }

    const [xy, setXY] = useState<XY>({x: 100, y: 0});

    const [angle, setAngle] = useState<number>(value? value as number : 0);

    const [mouseDown, setMouseDown] = useState<boolean>(false);

    const [timer, setTimer] = useState<boolean>(false);

    const timerHolder = useRef<ReturnType<typeof setInterval> | null>(null);

    const customAngleRef = useRef<HTMLInputElement>(null);

    const boxRef = useRef<HTMLFieldSetElement>(null);

    const lineRef = useRef<SVGLineElement>(null);

    const changeDirectionRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
        switch (event.currentTarget.value) {
            case "up":
                setXY({x: 100, y: 0})
                setAngle(2 * (Math.PI));
                sendData(2 * (Math.PI), parseInt(id!), startorstop!);
                break;
            case "right":
                setXY({x: 200, y: 100})
                setAngle(.5 * (Math.PI));
                sendData(.5 * (Math.PI), parseInt(id!), startorstop!);
                break;
            case "down":
                setXY({x: 100, y: 200})
                setAngle(1 * (Math.PI));
                sendData(1 * (Math.PI), parseInt(id!), startorstop!);
                break;
            case "left":
                setXY({x: 0, y: 100})
                setAngle(1.5 * (Math.PI));
                sendData(1.5 * (Math.PI), parseInt(id!), startorstop!);
                break;
            case "custom":
                break;
            default:
                break;
        }
    }

    const changeDirectionCircle = (event: React.MouseEvent<SVGGraphicsElement, MouseEvent>, updatable: boolean) => {
        if(updatable){
            customAngleRef.current!.click();

            let rect1 = event.currentTarget.getBoundingClientRect();

            const offset = boxRef.current!.offsetHeight / 2;

            let x2 = event.clientX - rect1.left;
            let y2 = event.clientY - rect1.top;

            let angle = (Math.atan2(offset - y2, offset - x2) - Math.PI/2);

            if (angle < 0) {
                angle += 2 * Math.PI;
            }
            
            setAngle(angle);

            let x = 100 + 50 * Math.cos(angle - Math.PI/2);
            let y = 100 + 50 * Math.sin(angle - Math.PI/2);

            setXY({x, y})

            sendData(angle, parseInt(id!), startorstop!);
        }
    }

    const mosueUpEvent = (event: React.MouseEvent<SVGGraphicsElement, MouseEvent>) => {
        setMouseDown(false);
    }

    const mosueDownEvent = (event: React.MouseEvent<SVGGraphicsElement, MouseEvent>) => {
        setMouseDown(true);
        changeDirectionCircle(event, true)
    }

    const mosueMoveEvent = (event: React.MouseEvent<SVGGraphicsElement, MouseEvent>) => {
        let truth = (timer && mouseDown);
        changeDirectionCircle(event, truth);
    }

    //TODO: find out the correct way to do this
    useEffect(() => {
        if(mouseDown){
            setTimer(true);
            let abstractedState = timer;
            if (timerHolder.current) {
                clearInterval(timerHolder.current);
                timerHolder.current = null;
            }
            timerHolder.current = setInterval(() => {
                setTimer(!abstractedState);
                abstractedState = !abstractedState;
            }, 10);
        } else {
            if (timerHolder.current) {
                clearInterval(timerHolder.current);
            }
            timerHolder.current = null;
        }
    }, [mouseDown])

    useEffect(() => {
        let newVal = lineRef.current?.dataset.value ? parseFloat(lineRef.current?.dataset.value) : 0;
        setAngle(newVal);
        let x = 100 + 50 * Math.cos(newVal - Math.PI/2);
        let y = 100 + 50 * Math.sin(newVal - Math.PI/2);
        setXY({x, y})
    }, [lineRef.current?.dataset.value])

    return (
        <div className="pt-[2rem] px-[4ch] flex flex-col max-w-[calc[100%-9ch]]" id={id}>
            <fieldset ref={boxRef} className="relative min-w-[100px] min-h-[100px] mb-[2rem]">
                <svg viewBox="50 50 100 100" xmlns="http://www.w3.org/2000/svg" onMouseDown={mosueDownEvent} onMouseUp={mosueUpEvent} onMouseLeave={mosueUpEvent} onMouseMove={mosueMoveEvent}>
                    <circle cx="100" cy="100" r="50" />
                    <line ref={lineRef} x1="100" y1="100" x2={xy.x} y2={xy.y} stroke="red" strokeWidth="2" data-value={value}/>
                </svg>
                <label className="absolute bottom-[105%] left-[calc(50%-10px)] w-[100px] mb-[-.4em]">
                    <input type="radio" name="angle" value="up" onChange={changeDirectionRadio}/> Up
                </label>
                <label className="absolute left-[105%] top-[calc(50%-10px)] h-[10px]">
                    <input type="radio" name="angle" value="right" onChange={changeDirectionRadio}/> Right
                </label>
                <label className="absolute top-[105%] left-[calc(50%-10px)] w-[100px]">
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
            <p className="whitespace-nowrap truncate w-[100px]">Angle: {angle}</p>
        </div>
    )
})

export default AngleSelector;