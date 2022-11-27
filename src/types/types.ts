import {ElementStates} from "./element-states";

export interface  ICircle {
    tail?: string;
    head?: string;
    value: string;
    state: ElementStates;
}

export interface IStack<T> {
    push: (item: T) => void,
    pop: () => void,
    reset: () => void
}

export interface IArray {
    number: number;
    state: ElementStates;
}

export interface ISortingState {
    isInProcess: boolean;
    isDescending: boolean;
    isAscending: boolean;
}

export interface IQueue<T> {
    enqueue: (item: T) => void,
    dequeue: () => void,
    reset: () => void
}