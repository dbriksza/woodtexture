interface Gradient {
    type: string;
    colors: Color[];
    angle: number;
    shape: string;
    size: string;
    shapeSize : {x: number, y: number};
    position: {x: number, y: number};
    interpolationMethod: string;
    repeating: boolean;
    stopList: Stop[];
    startList: Start[];
}

interface Color {
    color: string;
    index: number;
}

interface Stop {
    stop: string;
    index: number;
}

interface Start {
    start: string;
    index: number;
}