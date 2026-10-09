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
  updateGradientStopListStart: (index: number, start: string) => void;
  updateGradientStopListStop: (index: number, stop: string) => void;
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
    position: "",
    interpolationMethod: "",
    repeating: false,
    stopList: [{start: "0", stop: "100", index: 0}]
  });

  useEffect(() => {
        let constructedStyle = [];
    switch(gradient.type){
        case "linear":
            constructedStyle[1] = "linear-gradient("
    }
    constructedStyle[2] = gradient.angle + "deg,";
    let colorsAndStops = [];
    for(let i = 0; i < gradient.colors.length; i++){
        colorsAndStops.push(gradient.colors[i].color, " ");
        colorsAndStops.push(gradient.stopList[i].start, "% ");
        // i = gradient.colors.length - 1 ? 
        // colorsAndStops.push(gradient.stopList[i].stop, "%") : 
        colorsAndStops.push(gradient.stopList[i].stop, "%")
        colorsAndStops.push(",")
    }
    colorsAndStops = colorsAndStops.slice(0,colorsAndStops.length - 1);
    constructedStyle[3] = colorsAndStops.join("") + ")";
    setStyle(constructedStyle.join(" "))
  }, [gradient])

  const [style, setStyle] = useState<string>("")

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
    setGradient({...gradient, 
      colors: [...gradient.colors, {index: index, color: color}], 
      stopList: [...gradient.stopList, {index: index, start: "0", stop: "100"}]
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

  const updateGradientStopListStart = (index: number, start: string) => {
    setGradient({...gradient, 
      stopList: gradient.stopList.map(stopmap => 
        stopmap.index === index ? 
        {...gradient.stopList[index], start: start, stop: stopmap.stop, index: index} : 
        stopmap
      )
    })
  }

  const updateGradientStopListStop = (index: number, stop: string) => {
    setGradient({...gradient, 
      stopList: gradient.stopList.map(stopmap => 
        stopmap.index === index ? 
        {...gradient.stopList[index], start: stopmap.start, stop: stop, index: index} : 
        stopmap
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
    updateGradientStopListStart,
    updateGradientStopListStop,
    subtractColors,
    addColors,
  }

  return (
    <GradientContext.Provider value={value}>
      {children}
    </GradientContext.Provider>
  );
};
