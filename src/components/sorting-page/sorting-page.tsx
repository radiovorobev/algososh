import React, {useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import {RadioInput} from "../ui/radio-input/radio-input";
import {Button} from "../ui/button/button";
import styles from "./sorting-page.module.css";
import {Direction} from "../../types/direction";
import {ElementStates} from "../../types/element-states";
import {Column} from "../ui/column/column";
import {delay} from "../../utils/utils";
import {IArray, ISortingState} from "../../types/types";

export const SortingPage: React.FC = () => {

    const [array, setArray] = useState<Array<IArray>>([]);
    const [sorting, setSorting] = useState<string>("selection");
    const [inProcess, setInProcess] = useState(false);
    const [statesSort, setStatesSort] = useState<ISortingState>({
        isInProcess: false,
        isDescending: false,
        isAscending: false
    });

    const randomArray = () => {
        const size = Math.random() * (17 - 3) + 3;
        const arr: IArray[] = Array.from({ length: size }, () => ({
            number: Math.floor(Math.random() * 100) + 1,
            state: ElementStates.Default,
        }))
        setArray([...arr]);
    }

    const swap = (
        arr: IArray[],
        firstIndex: number,
        secondIndex: number
    ): void => {
        [arr[firstIndex], arr[secondIndex]] = [arr[secondIndex], arr[firstIndex]];
    };

    const selectionSort = async (
        sortingOption: "ascending" | "descending",
        array: IArray[]
    ) => {
        sortingOption === "ascending"
            ? setStatesSort({ ...statesSort, isAscending: true })
            : setStatesSort({ ...statesSort, isDescending: true });
        setInProcess(true);
        const arr = [...array];
        arr.forEach((el) => (el.state = ElementStates.Default));

        for (let i = 0; i < arr.length - 1; i++) {
            let swapInd = i;
            arr[swapInd].state = ElementStates.Changing;

            for (let n = i + 1; n < arr.length; n++) {
                arr[n].state = ElementStates.Changing;
                setArray([...arr]);
                await delay(500);
                if (
                    (sortingOption === "ascending"
                        ? arr[swapInd].number
                        : arr[n].number) >
                    (sortingOption === "ascending" ? arr[n].number : arr[swapInd].number)
                ) {
                    arr[swapInd].state =
                        i === swapInd ? ElementStates.Changing : ElementStates.Default;
                    swapInd = n;
                    setArray([...arr]);
                    await delay(500);
                }
                if (n !== swapInd) {
                    arr[n].state = ElementStates.Default;
                    setArray([...arr]);
                    await delay(500);
                }
            }
            if (i === swapInd) {
                arr[i].state = ElementStates.Modified;
                setArray([...arr]);
                await delay(500);
            } else {
                swap(arr, swapInd, i);
                arr[i].state = ElementStates.Modified;
                setArray([...arr]);
                await delay(500);
                arr[swapInd].state = ElementStates.Default;
                setArray([...arr]);
                await delay(500);
            }
        }
        arr.forEach((el) => (el.state = ElementStates.Modified));
        setInProcess(false);
        sortingOption === "ascending"
            ? setStatesSort({ ...statesSort, isAscending: false })
            : setStatesSort({ ...statesSort, isDescending: false });
    };

    const bubbleSort = async (
        sortingOption: "ascending" | "descending",
        initialArr: IArray[]
    ) => {
        sortingOption === "ascending"
            ? setStatesSort({ ...statesSort, isAscending: true })
            : setStatesSort({ ...statesSort, isDescending: true });
        setInProcess(true);

        const arr = [...initialArr];
        arr.forEach((el) => (el.state = ElementStates.Default));

        for (let i = 0; i < arr.length; i++) {
            for (let n = 0; n < arr.length - i - 1; n++) {
                arr[n].state = ElementStates.Changing;
                arr[n + 1].state = ElementStates.Changing;
                setArray([...arr]);
                await delay(500);

                if (
                    (sortingOption === "ascending" ? arr[n].number : arr[n + 1].number) >
                    (sortingOption === "ascending" ? arr[n + 1].number : arr[n].number)
                ) {
                    swap(arr, n, n + 1);
                    setArray([...arr]);
                    await delay(500);
                }
                arr[n].state = ElementStates.Default;
                arr[n + 1].state = ElementStates.Default;
                if (n === arr.length - i - 2) {
                    arr[n + 1].state = ElementStates.Modified;
                }
                setArray([...arr]);
                await delay(500);
            }
        }
        arr.forEach((el) => (el.state = ElementStates.Modified));
        setInProcess(false);
        sortingOption === "ascending"
            ? setStatesSort({ ...statesSort, isAscending: false })
            : setStatesSort({ ...statesSort, isDescending: false });
    };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.buttonsContainer}>
        <RadioInput
            label={'Выбор'}
            extraClass={`${styles.radioInput} mr-12`}
            checked={sorting === "selection"}
            onChange={() => setSorting("selection")}
            value="selection"
            disabled={inProcess}
        />
        <RadioInput
            label={'Пузырёк'}
            extraClass={`${styles.radioInput} mr-30`}
            checked={sorting === "bubble"}
            onChange={() => setSorting("bubble")}
            value="bubble"
            disabled={inProcess}
        />
        <Button
            extraClass={`mr-6`}
            text={'По возрастанию'}
            sorting={Direction.Ascending}
            isLoader={statesSort.isAscending}
            disabled={statesSort.isDescending}
            onClick={() =>
                sorting === "selection"
                    ? selectionSort(
                        "ascending",
                        array
                    )
                    : bubbleSort(
                        "ascending",
                        array
                    )}
        />
        <Button
            extraClass={`mr-40`}
            text={'По убыванию'}
            sorting={Direction.Descending}
            isLoader={statesSort.isDescending}
            disabled={statesSort.isAscending}
            onClick={() =>
                sorting === "selection"
                    ? selectionSort(
                        "descending",
                        array
                    )
                    : bubbleSort(
                        "descending",
                        array
                    )
            }
        />
        <Button
            text={'Новый массив'}
            onClick={randomArray}
            disabled={inProcess}
        />
      </div>
        <ul className={styles.columnList}>
            {array.map((column, i) => {
                return <Column index={column.number} state={column.state} key={i} />
            })}
        </ul>
    </SolutionLayout>
  );
};
