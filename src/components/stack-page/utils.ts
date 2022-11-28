import {ICircle, IStack} from "../../types/types";
import {ElementStates} from "../../types/element-states";

export class Stack implements IStack<ICircle> {
    private array: ICircle[] = [];

    push(item: ICircle) {
        this.array.push(item);
    }

    pop() {
        this.array.pop();
    }

    reset() {
        this.array = [];
    }

    changeState(index: number, state: ElementStates) {
        this.array[index].state = state;
    }

    getData() {
        return this.array
    }
}