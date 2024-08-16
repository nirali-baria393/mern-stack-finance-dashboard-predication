declare module 'regression' {
  export interface DataPoint {
    [key: number]: number;
  }

  export interface Result {
    points: DataPoint[];
    predict: (x: number) => DataPoint;
    equation: number[];
    string: string;
    r2: number;
  }

  export function linear(data: DataPoint[]): Result;
}
