interface Gradient {
    type: string;
    colors: Color[];
    angle: string;
    shape: string;
    position: string;
    interpolationMethod: string;
    repeating: boolean;
    stopList: Stop[];
}

interface Color {
    color: string;
    index: number;
}

interface Stop {
    start: string;
    stop: string;
    index: number;
}