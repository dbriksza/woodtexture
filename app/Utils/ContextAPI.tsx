'use client';

import { createContext, useEffect, useState, ReactNode } from 'react';

interface GradientContextType {
  gradient: Gradient;
  style: string;
  updateGradientType: (value: string) => void;
  updateGradientColors: (index: number, color: string) => void;
  updateGradientAngle: (value: string) => void;
  updateGradientShape: (value: string) => void;
  updateGradientPosition: (value: string) => void;
  updateGradientInterpolationMethod: (value: string) => void;
  updateGradientRepeating: (value: boolean) => void;
  updateGradientStartList: (index: number, start: string) => void;
  updateGradientStopList: (index: number, stop: string) => void;
  subtractColors: () => void;
  addColors: (index: number, color: string) => void;
}

export const GradientContext = createContext<GradientContextType>({} as GradientContextType);

export const GradientProvider = ({ children }: { children: ReactNode }) => {
  const [gradient, setGradient] = useState<Gradient>({
    type: "linear",
    colors: [{color: "#f58224", index: 0}],
    angle: "0",
    shape: "",
    size: "",
    position: "",
    interpolationMethod: "in srgb",
    repeating: false,
    startList: [{start: "0", index: 0}],
    stopList: [{stop: "10", index: 0}]
  });

  useEffect(() => {
    let constructedStyle = [];
    switch(gradient.type){
        case "linear":
            constructedStyle.push("linear-gradient(");
            constructedStyle.push(gradient.angle + "rad ");
            break;
          case "radial":
            constructedStyle.push("radial-gradient(");
            constructedStyle.push(gradient.shape + "rad," + gradient.size === "" ? "farthest-corner, " : gradient.size + " ");
            break;
          case "conic":
            constructedStyle.push("conic-gradient(");
            break;
    };
    constructedStyle.push(gradient.interpolationMethod + ",");
    let colorsAndStops = [];
    for(let i = 0; i < gradient.colors.length; i++){
        colorsAndStops.push(gradient.colors[i].color, " ");
        colorsAndStops.push(gradient.startList[i].start, "% ");
        colorsAndStops.push(gradient.stopList[i].stop, "%")
        colorsAndStops.push(",")
    };
    colorsAndStops = colorsAndStops.slice(0,colorsAndStops.length - 1);
    constructedStyle.push(colorsAndStops.join("") + ")");
    setStyle(constructedStyle.join(" "));
  }, [gradient]);

  const [style, setStyle] = useState<string>("");

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

  const updateGradientAngle = (value: string) => {
    setGradient({...gradient, angle: value});
  }

  const updateGradientShape = (value: string) => {
    setGradient({...gradient, shape: value});
  }

  const updateGradientPosition = (value: string) => {
    setGradient({...gradient, position: value});
  }

  const updateGradientInterpolationMethod = (value: string) => {
    setGradient({...gradient, interpolationMethod: value});
  }

  const updateGradientRepeating = (value: boolean) => {
    setGradient({...gradient, repeating: value});
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

  const value: GradientContextType = {
    gradient: gradient,
    style: style,
    updateGradientType,
    updateGradientColors,
    updateGradientAngle,
    updateGradientShape,
    updateGradientPosition,
    updateGradientInterpolationMethod,
    updateGradientRepeating,
    updateGradientStopList,
    updateGradientStartList,
    subtractColors,
    addColors,
  }

  return (
    <GradientContext.Provider value={value}>
      {children}
    </GradientContext.Provider>
  );
};
