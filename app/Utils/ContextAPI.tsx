'use client';

import { createContext, useEffect, useState, ReactNode } from 'react';

interface GradientContextType {
  gradients: Gradient[];
  style: string;
  currentGradient: Gradient;
  updateGradientType: (value: string) => void;
  updateGradientColors: (index: number, color: string) => void;
  updateGradientAngle: (angle: number) => void;
  updateGradientShape: (shape: string) => void;
  updateGradientSize: (size: string) => void;
  updateGradientPosition: (xory: "x" | "y" | "xy", value1: number, value2?: number) => void;
  updateGradientShapeSize: (xory: "x" | "y" | "xy", value1: number, value2?: number) => void;
  updateGradientInterpolationMethod: (interpMethod: string) => void;
  updateGradientRepeating: (repeating: boolean) => void;
  updateGradientStartList: (index: number, start: string) => void;
  updateGradientStopList: (index: number, stop: string) => void;
  subtractColors: () => void;
  addGradient: () => void;
  changeCurrentGradient: (value: number) => void;
  addColors: (index: number, color: string) => void;
}

export const GradientContext = createContext<GradientContextType>({} as GradientContextType);

export const GradientProvider = ({ children }: { children: ReactNode }) => {

  const [gradient, setGradient] = useState<Gradient>({
    type: "linear",
    colors: [{color: "#f58224", index: 0}],
    angle: 0,
    shape: "circle",
    size: "farthest-corner",
    shapeSize: {x: 50, y: 10},
    position: {x: 50, y: 50},
    interpolationMethod: "in srgb",
    repeating: false,
    startList: [{start: "0", index: 0}],
    stopList: [{stop: "10", index: 0}]
  });

  const [gradientArray, setGradientArray] = useState<Gradient[]>([
    {
      type: "linear",
      colors: [{color: "#f58224", index: 0}],
      angle: 0,
      shape: "circle",
      size: "farthest-corner",
      shapeSize: {x: 50, y: 10},
      position: {x: 50, y: 50},
      interpolationMethod: "in srgb",
      repeating: false,
      startList: [{start: "0", index: 0}],
      stopList: [{stop: "10", index: 0}]
    }
  ]);

  const [currentGradient, setCurrentGradient] = useState<number>(0)

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
          colorsAndStops.push(grad.colors[i].color + " ");
          colorsAndStops.push(grad.startList[i].start + "% ");
          colorsAndStops.push(grad.stopList[i].stop + "%");
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

    console.log(newStyle)
  }

  useEffect(() => {

    setGradientArray([
      ...gradientArray.map((grad, i) => 
        i === currentGradient ? 
      {...grad, ...gradient} : 
      grad)
    ]);

  }, [gradient]);

  useEffect(() => {
    styleCompiler();
  }, [gradientArray])


  const updateGradientType = (value: string) => {
    setGradient({...gradient, type: value});
  }

  const updateGradientColors = ( index: number, color: string) => {
    setGradient({...gradient,  
      colors: gradient.colors.map((singleColor) => 
        singleColor.index === index ? 
        {...singleColor, ...{index: index, color: color}} : 
        singleColor
      ) 
    })
  }

  const addColors = (index: number, color: string) => {
    let newStart = parseInt(gradient.stopList[gradient.stopList.length - 1].stop) > 90 ?
      100 : 
      parseInt(gradient.stopList[gradient.stopList.length - 1].stop) + 10;
    let newStop = newStart > 90 ? 100 : newStart + 10;
    setGradient({...gradient, 
      colors: [...gradient.colors, {index: index, color: color}], 
      startList: [...gradient.startList, {index: index, start: newStart.toString()}],
      stopList: [...gradient.stopList, {index: index, stop: newStop.toString()}],
      
    });
  }

  const subtractColors = () => {
    setGradient({...gradient, 
      colors: gradient.colors.filter((item) => item.index !== gradient.colors.length - 1),
      stopList: gradient.stopList.filter((item) => item.index !== gradient.stopList.length - 1)
    })
  }

  const updateGradientAngle = (angle: number) => {
    setGradient({...gradient, angle: angle});
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

  const updateGradientStopList = (index: number, stop: string) => {
    setGradient({...gradient, 
      stopList: gradient.stopList.map(stopmap => 
        stopmap.index === index ? 
        {...gradient.stopList[index], stop: stop, index: index} : 
        stopmap
      )
    })
  }

  const updateGradientStartList = (index: number, start: string) => {
    setGradient({...gradient, 
      startList: gradient.startList.map(startmap => 
        startmap.index === index ? 
        {...gradient.startList[index], start: start, index: index} : 
        startmap
      )
    })
  }

  const addGradient = () => {
    setGradientArray([...gradientArray, gradient]);
    setGradient(gradientArray[gradientArray.length - 1]);
    setCurrentGradient(gradientArray.length - 1);
  }

  const changeCurrentGradient = (value: number) => {
    setGradient(gradientArray[value]);
  }

  const value: GradientContextType = {
    gradients: gradientArray,
    style: style,
    currentGradient: gradient,
    updateGradientType,
    updateGradientColors,
    updateGradientAngle,
    updateGradientShape,
    updateGradientPosition,
    updateGradientShapeSize,
    updateGradientInterpolationMethod,
    updateGradientRepeating,
    updateGradientStopList,
    updateGradientStartList,
    subtractColors,
    addColors,
    updateGradientSize,
    addGradient,
    changeCurrentGradient,
  }

  return (
    <GradientContext.Provider value={value}>
      {children}
    </GradientContext.Provider>
  );
};
