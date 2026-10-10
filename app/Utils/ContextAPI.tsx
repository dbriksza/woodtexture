'use client';

import { createContext, useEffect, useState, ReactNode } from 'react';

interface GradientContextType {
  gradients: Gradient[];
  style: string;
  currentGradient: Gradient;
  updateGradientType: (value: string) => void;
  updateGradientColors: (index: number, color: string) => void;
  updateGradientColorsAlpha: (index: number, alpha: string) => void;
  updateGradientAngle: (angle: number) => void;
  updateGradientShape: (shape: string) => void;
  updateGradientSize: (size: string) => void;
  updateGradientPosition: (xory: "x" | "y" | "xy", value1: number, value2?: number) => void;
  updateGradientShapeSize: (xory: "x" | "y" | "xy", value1: number, value2?: number) => void;
  updateGradientInterpolationMethod: (interpMethod: string) => void;
  updateGradientRepeating: (repeating: boolean) => void;
  updateGradientStartList: (index: number, start: number) => void;
  updateGradientStopList: (index: number, stop: number) => void;

  subtractColors: () => void;
  addColors: (index: number, color: string) => void;

  addGradient: () => void;
  changeCurrentGradient: (value: number) => void;
}

export const GradientContext = createContext<GradientContextType>({} as GradientContextType);

export const GradientProvider = ({ children }: { children: ReactNode }) => {

  const baseGradient = {
    index: 0,
    type: "linear",
    colors: [{color: "#f58224", alpha: "ff", index: 0}],
    angle: 0,
    shape: "circle",
    size: "farthest-corner",
    shapeSize: {x: 50, y: 10},
    position: {x: 50, y: 50},
    interpolationMethod: "in srgb",
    repeating: false,
    startList: [{pos: 0, index: 0}],
    stopList: [{pos: 10, index: 0}]
  }

  const [gradient, setGradient] = useState<Gradient>(baseGradient);

  const [gradientArray, setGradientArray] = useState<Gradient[]>([baseGradient]);

  const [currentGradientInd, setCurrentGradientInd] = useState<number>(0)

  const [style, setStyle] = useState<string>("");

  const styleCompiler = () => {

    let constructedStyle: string[] = [];

    gradientArray.forEach((grad) => {

      switch(grad.type){
        case "linear":
            constructedStyle.push("linear-gradient(");
            constructedStyle.push(grad.angle + "rad ");
            break;
          case "radial":
            constructedStyle.push("radial-gradient(");
            constructedStyle.push(grad.shape + " ");
            if(grad.shape === "ellipse"){
              constructedStyle.push(grad.shapeSize.x + "% " + grad.shapeSize.y + "% " );
            } else {
              constructedStyle.push(grad.size + " ")
            }
            constructedStyle.push("at " + grad.position.x + "% " + grad.position.y + "% ");
            // constructedStyle.push(gradient.size + " ");
            break;
          case "conic":
            constructedStyle.push("conic-gradient(");
            break;
      };

      constructedStyle.push(grad.interpolationMethod + ", ");

      let colorsAndStops = [];

      for(let i = 0; i < grad.colors.length; i++){
          colorsAndStops.push(grad.colors[i].color + grad.colors[i].alpha + " ");
          colorsAndStops.push(grad.startList[i].pos + (grad.type === "conic" ? "rad " : "% "));
          colorsAndStops.push(grad.stopList[i].pos + (grad.type === "conic" ? "rad " : "% "));
          colorsAndStops.push(", ");
      };

      colorsAndStops = colorsAndStops.slice(0, colorsAndStops.length - 1);

      let JoinedColorsAndStops = colorsAndStops.join("");

      constructedStyle.push(JoinedColorsAndStops + ")");

      constructedStyle.push(", ")

    });

    constructedStyle.pop();

    let newStyle = constructedStyle.join("")

    setStyle(newStyle);
  }

  const updateGradientArray = () => {
    setGradientArray([
      ...gradientArray.map((grad, i) => 
        i === currentGradientInd ? 
      {...grad, ...gradient} : 
      grad)
    ]);
  }

  useEffect(() => {
    updateGradientArray();
  }, [gradient]);

  useEffect(() => {
    styleCompiler();
  }, [gradientArray])

  const normalizeAngle = (angle: number) => {
    if (angle < 0) {
        angle += 2 * Math.PI;
    }
    return angle;
  }

  const percentAngleConversion = (value: number, conversionType: "toRad" | "toPercent") => {
    let newValue: number = 0;
    if(conversionType === "toRad"){
      newValue = (value / 100) * 2 * Math.PI;
    } else if (conversionType === "toPercent") {
      newValue = (value / (2 * Math.PI)) * 100;
    }
    return newValue;
  }

  const updateGradientType = (value: string) => {

    let direction: "toRad" | "toPercent" | "neither";

    if((gradient.type === "radial" || gradient.type === "linear") && value === "conic") {
      direction = "toRad";
    } else if (gradient.type === "conic" && (value === "radial" || value === "linear")) {
      direction = "toPercent";
    } else {
      direction = "neither";
    }

    if(direction === "neither") {
      setGradient({...gradient, type: value});
    } else {
     
      let newStartValues: {pos: number, index: number}[] = [];

      let newStopValues: {pos: number, index: number}[] = [];

      gradient.startList.forEach(start => {
        newStartValues.push({pos: percentAngleConversion(start.pos, direction), index: start.index})
      })

      gradient.stopList.forEach(stop => {
        newStopValues.push({pos: percentAngleConversion(stop.pos, direction), index: stop.index})
      })
      
      setGradient({...gradient, startList: newStartValues, stopList: newStopValues, type: value});
    }    
  }

  const updateGradientColors = ( index: number, color: string) => {
    
    setGradient({...gradient,  
      colors: gradient.colors.map((singleColor) => 
        singleColor.index === index ? 
        {...singleColor, ...{color: color}} : 
        singleColor
      ) 
    })

  }

    const updateGradientColorsAlpha = ( index: number, alpha: string) => {
    
    setGradient({...gradient,  
      colors: gradient.colors.map((singleColor) => 
        singleColor.index === index ? 
        {...singleColor, ...{alpha: alpha}} : 
        singleColor
      ) 
    })

  }

  const addColors = (index: number, color: string) => {

    let newStart = (gradient.colors.length === 0 ? 
      0 : 
      gradient.stopList[gradient.stopList.length - 1].pos) > 90 ?
      100 : 
      gradient.stopList[gradient.stopList.length - 1].pos + 10;

    let newStop = newStart > 90 ? 100 : newStart + 10;

    setGradient({...gradient, 
      colors: [...gradient.colors, {index: index, color: color, alpha: "ff"}], 
      startList: [...gradient.startList, {index: index, pos: gradient.type === "conic" ? normalizeAngle(newStart) : newStart}],
      stopList: [...gradient.stopList, {index: index, pos: gradient.type === "conic" ? normalizeAngle(newStop) : newStop}],
    });
  }

  const subtractColors = () => {
    setGradient({...gradient, 
      colors: gradient.colors.filter((item) => item.index !== gradient.colors.length - 1),
      stopList: gradient.stopList.filter((item) => item.index !== gradient.stopList.length - 1)
    })
  }

  const updateGradientAngle = (angle: number) => {
    setGradient({...gradient, angle: normalizeAngle(angle)});
  }

  const updateGradientShape = (shape: string) => {
    setGradient({...gradient, shape: shape});
  }

  const updateGradientPosition = (xory: string, value1: number, value2?: number) => {
    if(xory === "x"){
      setGradient({...gradient, position: {x: value1, y: gradient.position.y}});
    } else if(xory === "y") {
      setGradient({...gradient, position: {x: gradient.position.x, y: value1}});
    } else if (xory === "xy" && value2) {
      setGradient({...gradient, position: {x: value1, y: value2}});
    }
  }

  const updateGradientShapeSize = (xory: string, value1: number, value2?: number) => {
    if(xory === "x"){
      setGradient({...gradient, shapeSize: {x: value1, y: gradient.shapeSize.y}});
    } else if(xory === "y") {
      setGradient({...gradient, shapeSize: {x: gradient.shapeSize.x, y: value1}});
    } else if (xory === "xy" && value2) {
      setGradient({...gradient, shapeSize: {x: value1, y: value2}});
    }
  }

  const updateGradientInterpolationMethod = (interpMethod: string) => {
    setGradient({...gradient, interpolationMethod: interpMethod});
  }

  const updateGradientRepeating = (value: boolean) => {
    setGradient({...gradient, repeating: value});
  }

  const updateGradientSize = (size: string) => {
    setGradient({...gradient, size: size});
  }

  const updateGradientStopList = (index: number, stop: number) => {
    setGradient({...gradient, 
      stopList: gradient.stopList.map(stopmap => 
        stopmap.index === index ? 
        {...gradient.stopList[index], pos: stop, index: index} : 
        stopmap
      )
    })
  }

  const updateGradientStartList = (index: number, start: number) => {
    setGradient({...gradient, 
      startList: gradient.startList.map(startmap => 
        startmap.index === index ? 
        {...gradient.startList[index], pos: start, index: index} : 
        startmap
      )
    })
  }

  const addGradient = () => {
    updateGradientArray();
    setGradientArray([...gradientArray, {...baseGradient, index: gradientArray.length}]);
    changeCurrentGradient(gradientArray.length - 1)
    setCurrentGradientInd(gradientArray.length - 1);
  }

  const changeCurrentGradient = (value: number) => {
    setGradient(gradientArray.filter((item) => item.index === value)[0]);
    setCurrentGradientInd(value);
  }

  const value: GradientContextType = {
    gradients: gradientArray,
    style: style,
    currentGradient: gradient,

    updateGradientType,
    updateGradientColors,
    updateGradientColorsAlpha,
    updateGradientAngle,
    updateGradientShape,
    updateGradientSize,
    updateGradientPosition,
    updateGradientShapeSize,
    updateGradientInterpolationMethod,
    updateGradientRepeating,
    updateGradientStopList,
    updateGradientStartList,

    subtractColors,
    addColors,

    addGradient,
    changeCurrentGradient,
  }

  return (
    <GradientContext.Provider value={value}>
      {children}
    </GradientContext.Provider>
  );
};
