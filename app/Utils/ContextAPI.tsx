'use client';

import { createContext, useEffect, useState, ReactNode } from 'react';

interface GradientContextType {
  gradients: Gradient[];
  style: string;
  currentGradient: Gradient;
  updateGradientType: (value: string) => void;
  updateGradientColors: (id: number, color: string) => void;
  updateGradientColorsAlpha: (id: number, alpha: string) => void;
  updateGradientAngle: (angle: number) => void;
  updateGradientShape: (shape: string) => void;
  updateGradientSize: (size: string) => void;
  updateGradientPosition: (xory: "x" | "y" | "xy", value1: number, value2?: number) => void;
  updateGradientShapeSize: (xory: "x" | "y" | "xy", value1: number, value2?: number) => void;
  updateGradientInterpolationMethod: (interpMethod: string) => void;
  updateGradientRepeating: (repeating: boolean) => void;
  updateGradientStartList: (id: number, start: number) => void;
  updateGradientStopList: (id: number, stop: number) => void;

  subtractColors: () => void;
  addColors: (id: number, color: string) => void;

  addGradient: () => void;
  changeCurrentGradient: (value: number) => void;

  normalizeStartStop: () => void;

  setAllAlpha: (value: string) => void;

  addSpaceBetweenStops: (value: number) => void;
  shiftStops: (value: number) => void;

  moveItem: (fromIndex: number, toIndex: number) => void;

  changeUnits: (value: string) => void;

  updateRepeating: (value: boolean) => void;
}

export const GradientContext = createContext<GradientContextType>({} as GradientContextType);

export const GradientProvider = ({ children }: { children: ReactNode }) => {

  const baseGradient = {
    id: 0,
    type: "linear",
    colors: [{color: "#f58224", alpha: "ff", id: 0}],
    angle: 0,
    shape: "circle",
    size: "farthest-corner",
    shapeSize: {x: 50, y: 10},
    position: {x: 50, y: 50},
    interpolationMethod: "in srgb",
    repeating: false,
    startList: [{pos: 0, id: 0}],
    stopList: [{pos: 10, id: 0}],
    units: "%"
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
          constructedStyle.push(grad.repeating ? "repeating-linear-gradient(": "linear-gradient(");
          constructedStyle.push(grad.angle + "rad ");
          break;
        case "radial":
          constructedStyle.push(grad.repeating ? "repeating-radial-gradient(" : "radial-gradient(");
          constructedStyle.push(grad.shape + " ");
          if(grad.shape === "ellipse"){
            constructedStyle.push(grad.shapeSize.x + grad.units + " " + grad.shapeSize.y + grad.units + " " );
          } else {
            constructedStyle.push(grad.size + " ")
          }
          constructedStyle.push("at " + grad.position.x + grad.units + " " + grad.position.y + gradient.units + " ");
          // constructedStyle.push(gradient.size + " ");
          break;
        case "conic":
          constructedStyle.push(grad.repeating ? "repeating-conic-gradient(" : "conic-gradient(");
          break;
      };

      constructedStyle.push(grad.interpolationMethod + ", ");

      let colorsAndStops = [];

      for(let i = 0; i < grad.colors.length; i++){
          colorsAndStops.push(grad.colors[i].color + grad.colors[i].alpha + " ");
          colorsAndStops.push(grad.startList[i].pos + (grad.type === "conic" ? "rad " : gradient.units + " "));
          colorsAndStops.push(grad.stopList[i].pos + (grad.type === "conic" ? "rad " : gradient.units + " "));
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
      newValue = Math.round((value / (2 * Math.PI)) * 100);
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
     
      let newStartValues: {pos: number, id: number}[] = [];

      let newStopValues: {pos: number, id: number}[] = [];

      gradient.startList.forEach(start => {
        newStartValues.push({pos: percentAngleConversion(start.pos, direction), id: start.id})
      })

      gradient.stopList.forEach(stop => {
        newStopValues.push({pos: percentAngleConversion(stop.pos, direction), id: stop.id})
      })
      
      setGradient({...gradient, startList: newStartValues, stopList: newStopValues, type: value});
    }    
  }

  const normalizeStartStop = () => {
    let numColors: number = gradient.colors.length;
    let percentage: number = (1 / numColors) * 100;
    let newStartValues: {pos: number, id: number}[] = [];
    let newStopValues: {pos: number, id: number}[] = [];
    for(let i = 0; i < numColors; i++){
      if(gradient.type === "conic"){
        newStartValues.push({pos: percentAngleConversion(i * percentage, "toRad"), id: i})
        newStopValues.push({pos: percentAngleConversion((i + 1) * percentage, "toRad"), id: i})
      } else {
        newStartValues.push({pos: Math.round(i * percentage), id: i})
        newStopValues.push({pos: Math.round((i + 1) * percentage), id: i})
      }
    }
    setGradient({...gradient, startList: newStartValues, stopList: newStopValues});
  }

  const updateGradientColors = ( id: number, color: string) => {
    
    setGradient({...gradient,  
      colors: gradient.colors.map((singleColor) => 
        singleColor.id === id ? 
        {...singleColor, ...{color: color}} : 
        singleColor
      ) 
    })
  }

    const updateGradientColorsAlpha = ( id: number, alpha: string) => {
    
    setGradient({...gradient,  
      colors: gradient.colors.map((singleColor) => 
        singleColor.id === id ? 
        {...singleColor, ...{alpha: alpha}} : 
        singleColor
      ) 
    })
  }

  const addColors = (id: number, color: string) => {

    let newStart: number;

    if(gradient.colors.length === 0) {
      newStart = 0;
    } else {
      if(gradient.stopList[gradient.stopList.length - 1].pos > 90) {
        newStart = 100
      } else {
        newStart = gradient.stopList[gradient.stopList.length - 1].pos + 10
      }
    }

    let newStop = newStart > 90 ? 100 : newStart + 10;

    setGradient({...gradient, 
      colors: [...gradient.colors, {id: id, color: color, alpha: "ff"}], 
      startList: [...gradient.startList, {id: id, pos: gradient.type === "conic" ? normalizeAngle(newStart) : newStart}],
      stopList: [...gradient.stopList, {id: id, pos: gradient.type === "conic" ? normalizeAngle(newStop) : newStop}],
    });
  }

  const subtractColors = () => {
    setGradient({...gradient, 
      colors: gradient.colors.filter((item) => item.id !== gradient.colors.length - 1),
      stopList: gradient.stopList.filter((item) => item.id !== gradient.stopList.length - 1)
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

  const updateGradientStopList = (id: number, stop: number) => {
    setGradient({...gradient, 
      stopList: gradient.stopList.map(stopmap => 
        stopmap.id === id ? 
        {...gradient.stopList[id], pos: stop, id: id} : 
        stopmap
      )
    })
  }

  const updateGradientStartList = (id: number, start: number) => {
    setGradient({...gradient, 
      startList: gradient.startList.map(startmap => 
        startmap.id === id ? 
        {...gradient.startList[id], pos: start, id: id} : 
        startmap
      )
    })
  }

  const addGradient = () => {
    updateGradientArray();
    setGradientArray([...gradientArray, {...baseGradient, id: gradientArray.length}]);
    changeCurrentGradient(gradientArray.length - 1)
    setCurrentGradientInd(gradientArray.length - 1);
  }

  const changeCurrentGradient = (value: number) => {
    setGradient(gradientArray.filter((item) => item.id === value)[0]);
    setCurrentGradientInd(gradientArray.findIndex(gradient => gradient.id === value));
  }

  const setAllAlpha = (value: string) => {
    setGradient({...gradient, 
      colors: gradient.colors.map((color) => 
        ({...color, alpha: value})) 
    })
  }

  const addSpaceBetweenStops = (value: number) => {
    let newStartValues: {pos: number, id: number}[] = [{pos: gradient.startList[0].pos, id: gradient.startList[0].id}];
    let newStopValues: {pos: number, id: number}[] = [];
    for(let i = 0; i < gradient.startList.length - 1; i++){
      newStartValues.push({pos: gradient.startList[i + 1].pos + (.5 * value), id: gradient.startList[i + 1].id})
      newStopValues.push({pos: gradient.stopList[i].pos - (.5 * value), id: gradient.stopList[i].id})
    }
    newStopValues.push({pos: gradient.stopList[gradient.startList.length - 1].pos, id: gradient.stopList[gradient.startList.length - 1].id})
    setGradient({...gradient, startList: newStartValues, stopList: newStopValues})
  }

  const shiftStops = (value: number) => {
    let newStartValues: {pos: number, id: number}[] = [];
    let newStopValues: {pos: number, id: number}[] = [];
    for(let i = 0; i < gradient.startList.length; i++){
      newStartValues.push({pos: gradient.startList[i].pos + value, id: gradient.startList[i].id})
      newStopValues.push({pos: gradient.stopList[i].pos + value, id: gradient.stopList[i].id})
    }
    setGradient({...gradient, startList: newStartValues, stopList: newStopValues})
  }

  const moveItem = (fromIndex: number, toIndex: number) => {
    setGradientArray((prevItems) => {
      const newItems = [...prevItems];
      const [movedItem] = newItems.splice(fromIndex, 1);
      newItems.splice(toIndex, 0, movedItem);
      return newItems;
    });
  };

  const changeUnits = (value: string) => {
    setGradient({...gradient, units: value});
  }

  const updateRepeating = (value: boolean) => {
    setGradient({...gradient, repeating: value});
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

    normalizeStartStop,

    setAllAlpha,

    addSpaceBetweenStops,
    shiftStops,
    moveItem,
    changeUnits,
    updateRepeating,
  }

  return (
    <GradientContext.Provider value={value}>
      {children}
    </GradientContext.Provider>
  );
};
