import React, {useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {delay} from "../../utils/utils";
import {fibAlgorithm} from "./utils";

export const FibonacciPage: React.FC = () => {
    const [inputValue, setInputValue] = useState<number>(0);
    const [loader, setLoader] = useState(false);
    const [resultArray, setArray] = useState<Array<number>>([]);

    const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        setInputValue(+e.currentTarget.value)
    }

    const getFib = async () => {
        setLoader(true);
        const array = [];
        for (let i = 1; i <= inputValue + 1; i++) {
            await delay(500);
            array.push(fibAlgorithm(i));
            setArray([...array]);
        }
        setLoader(false);
    }
    const handleClick = (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        getFib();
    }
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.formContainer}>
        <Input type={'number'} isLimitText={true} max={19} onChange={handleInputChange} />
        <Button text={'Раccчитать'} disabled={inputValue ? inputValue > 19 : true} onClick={handleClick} isLoader={loader} />
      </div>
        <ul className={styles.circlesContainer}>
            {
                resultArray && resultArray.map((number, index) =>
                    <li key={index}>
                        <Circle letter={number.toString()}/>
                        <p>{index}</p>
                    </li>
                )
            }
        </ul>
    </SolutionLayout>
  );
};