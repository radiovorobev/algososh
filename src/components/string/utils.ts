import {ICircle} from "../../types/types";

export const swap = (
    arr: ICircle[],
    firstIndex: number,
    secondIndex: number
): void => {
    [arr[firstIndex], arr[secondIndex]] = [arr[secondIndex], arr[firstIndex]];
};