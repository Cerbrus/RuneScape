export enum Cardinal {
    North = 1 << 1,
    East = 1 << 2,
    South = 1 << 3,
    West = 1 << 4,
    All = North | East | South | West,

    Hallway = North | South,
    Corner = East | South,
    TJunction = East | South | West
}

export type TCardinal = 'N' | 'E' | 'S' | 'W';
