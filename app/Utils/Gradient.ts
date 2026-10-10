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
    stopList: {pos: number, index: number}[];
    startList: {pos: number, index: number}[];
}

interface Color {
    color: string;
    index: number;
}