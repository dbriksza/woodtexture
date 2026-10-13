interface Gradient {
    id: number;
    type: string;
    colors: Color[];
    angle: number;
    shape: string;
    size: string;
    shapeSize : {x: number, y: number};
    position: {x: number, y: number};
    interpolationMethod: string;
    repeating: boolean;
    stopList: {pos: number, id: number}[];
    startList: {pos: number, id: number}[];
    units: string;
}

interface Color {
    color: string;
    alpha: string;
    id: number;
}