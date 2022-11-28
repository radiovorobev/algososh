import {IArray} from "../../types/types";
import {ElementStates} from "../../types/element-states";

export const randomArray = () => {
    const size = Math.random() * (17 - 3) + 3;
    const arr: IArray[] = Array.from({ length: size }, () => ({
        number: Math.floor(Math.random() * 100) + 1,
        state: ElementStates.Default,
    }))
    return arr;
}

export const swap = (
    arr: IArray[],
    firstIndex: number,
    secondIndex: number
): void => {
    [arr[firstIndex], arr[secondIndex]] = [arr[secondIndex], arr[firstIndex]];
};