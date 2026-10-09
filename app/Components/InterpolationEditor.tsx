'use client'
import { use, useState, useEffect, useRef } from "react"
import { GradientContext } from "../Utils/ContextAPI"

export default function InterpolationEditor() {

    const gradientContainer = use(GradientContext);

    const [interpMethodShape, setInterpMethodShape] = useState<string>("rectangular-color-space");

    const [interpMethodSpace, setInterpMethodSpace] = useState<string>("srgb");

    const [hueInterpMethod, setHueInterpMethod] = useState<string>("shorter");

    const defaultRectangularRef = useRef<HTMLInputElement>(null);

    const defaultPolarRef = useRef<HTMLInputElement>(null);

    const changeInterpolationMethodShape = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInterpMethodShape(event.currentTarget.value);
        event.currentTarget.value === "rectangular-color-space" ? defaultRectangularRef.current!.click() : defaultPolarRef.current!.click();
    }

    const changeInterpolationMethodSpace = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInterpMethodSpace(event.currentTarget.value);
    }

    const changeHueInterpolationMethod = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHueInterpMethod(event.currentTarget.value);
    }

    useEffect(() => {
        let fullInterp: string[] = [];
        fullInterp.push("in " + interpMethodSpace + " ");
        if(interpMethodShape === "polar-color-space"){
            fullInterp.push(hueInterpMethod + " hue")
        }
        gradientContainer.updateGradientInterpolationMethod(fullInterp.join(""))
    }, [interpMethodShape, interpMethodSpace, hueInterpMethod])

    return (
        <div>
            <fieldset className="flex flex-row">
                <div className="flex flex-col">
                    <p>Interpolation Shape</p>
                    <div className="flex flex-col">
                        <label>
                            <input type="radio" name="interpolationMethodShape" value="rectangular-color-space" 
                            onChange={changeInterpolationMethodShape} defaultChecked/> Rectangular
                        </label>
                        <label>
                            <input type="radio" name="interpolationMethodShape" value="polar-color-space" 
                            onChange={changeInterpolationMethodShape}/> Polar
                        </label>
                    </div>
                    {interpMethodShape === "polar-color-space" && <>
                        <div className="flex flex-col">
                            <p>Hue Interpolation Method</p>
                            <label>
                                <input type="radio" name="hueInterpolationMethod" value="shorter" 
                                onChange={changeHueInterpolationMethod}/> Shorter
                            </label>
                            <label>
                                <input type="radio" name="hueInterpolationMethod" value="longer" 
                                onChange={changeHueInterpolationMethod}/> Longer
                            </label>
                            <label>
                                <input type="radio" name="hueInterpolationMethod" value="increasing" 
                                onChange={changeHueInterpolationMethod}/> Increasing
                            </label>
                            <label>
                                <input type="radio" name="hueInterpolationMethod" value="decreasing" 
                                onChange={changeHueInterpolationMethod}/> Decreasing
                            </label>
                        </div>
                    </>}
                </div>
                <div className="flex flex-col">
                    <p>Interpolation Color Space</p>
                    {interpMethodShape === "rectangular-color-space" && <>
                        <label>
                            <input ref={defaultRectangularRef} type="radio" name="interpolationMethodSpace" value="srgb" 
                            onChange={changeInterpolationMethodSpace} defaultChecked/> SRGB
                        </label>
                        <label>
                            <input type="radio" name="interpolationMethodSpace" value="srgb-linear" 
                            onChange={changeInterpolationMethodSpace}/> SRGB-Linear
                        </label>
                        <label>
                            <input type="radio" name="interpolationMethodSpace" value="display-p3" 
                            onChange={changeInterpolationMethodSpace}/> Display-P3
                        </label>
                        <label>
                            <input type="radio" name="interpolationMethodSpace" value="display-p3-linear" 
                            onChange={changeInterpolationMethodSpace}/> Display-P3-Linear
                        </label>
                        <label>
                            <input type="radio" name="interpolationMethodSpace" value="a98-rgb" 
                            onChange={changeInterpolationMethodSpace}/> A98-RGB
                        </label>
                        <label>
                            <input type="radio" name="interpolationMethodSpace" value="prophoto-rgb" 
                            onChange={changeInterpolationMethodSpace}/> ProPhoto-RGB
                        </label>
                        <label>
                            <input type="radio" name="interpolationMethodSpace" value="rec2020" 
                            onChange={changeInterpolationMethodSpace}/> REC2020
                        </label>
                        <label>
                            <input type="radio" name="interpolationMethodSpace" value="lab" 
                            onChange={changeInterpolationMethodSpace}/> LAB
                        </label>
                        <label>
                            <input type="radio" name="interpolationMethodSpace" value="oklab" 
                            onChange={changeInterpolationMethodSpace}/> OKLAB
                        </label>
                    </>}
                    {interpMethodShape === "polar-color-space" && <>
                        <label>
                            <input ref={defaultPolarRef} type="radio" name="interpolationMethodSpace" value="hsl" 
                            onChange={changeInterpolationMethodSpace}/> HSL
                        </label>
                        <label>
                            <input type="radio" name="interpolationMethodSpace" value="hwb" 
                            onChange={changeInterpolationMethodSpace}/> HWB
                        </label>
                        <label>
                            <input type="radio" name="interpolationMethodSpace" value="lch" 
                            onChange={changeInterpolationMethodSpace}/> LCH
                        </label>
                        <label>
                            <input type="radio" name="interpolationMethodSpace" value="oklch" 
                            onChange={changeInterpolationMethodSpace}/> OKLCH
                        </label>
                    </>}
                </div>
            </fieldset>
        </div>
    )
}