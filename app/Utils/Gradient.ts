interface Gradient {
    type: string;
    colors: Color[];
    angle: string;
    shape: string;
    position: string;
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