import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./string.module.css";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import {delay} from "../../utils/utils";
import {ICircle} from "../../types/types";
import {swap} from "./utils";
import {DELAY_IN_MS} from "../../constants/delays";

export const StringComponent: React.FC = () => {

    const [inputValue, setInputValue] = useState('');
    const [loader, setLoader] = useState(false);
    const [resultArray, setArray] = useState<ICircle[]>([]);

    const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value);
    };

    const reverseString = async (value: string) => {
        setInputValue('');
        setLoader(true);
        const array: ICircle[] = [];
        if (value.length === 1) {
            value.split('').forEach(el => {
                array.push({ value: el, state: ElementStates.Modified });
                setArray([...array]);
            });
        } else {
        value.split('').forEach(el => {
            array.push({ value: el, state: ElementStates.Default });
        });
        setArray([...array]);
        await delay(DELAY_IN_MS);
        for (let arr = array, start = 0, end = arr.length - 1; end >= start; start++, end--) {
            if (end === start) {
                array[start].state = ElementStates.Modified;
                setArray([...array]);
                setLoader(false);
            }
            else {
                array[start].state = ElementStates.Changing;
                array[end].state = ElementStates.Changing;
                setArray([...array]);
                await delay(1000);
                swap(array, start, end);
                array[start].state = ElementStates.Modified;
                array[end].state = ElementStates.Modified;
                setArray([...array]);
                }
            }
        }
        setLoader(false);
    };

    const handleClick = (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        reverseString(inputValue);
    }

  return (
    <SolutionLayout title="Строка">
        <div className={styles.formContainer}>
            <Input isLimitText={true} maxLength={11} onChange={handleInputChange} data-testid='input' value={inputValue}/>
            <Button text={'Развернуть'} disabled={!inputValue} onClick={handleClick} isLoader={loader} data-testid='button'/>
        </div>
        <div className={styles.circlesContainer}>
            {
                resultArray &&
                resultArray.map((data: ICircle, index: number) => {
                    return <Circle letter={data.value} state={data.state} key={index} data-testid='circle'/> }
                )
            }
        </div>
    </SolutionLayout>
  );
};