import React, {ChangeEvent} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import styles from "./stack-page.module.css";
import {Circle} from "../ui/circle/circle";
import {delay} from "../../utils/utils";
import {ElementStates} from "../../types/element-states";
import {Stack} from "./utils";

export const StackPage: React.FC = () => {
    const [disableButton, setDisableButton] = React.useState(true);
    const [value, setValue] = React.useState('');
    const [, update] = React.useState({});

    const stack = React.useRef(new Stack());
    const array = stack.current.getData();

    React.useEffect(() => {
        if (value.length > 0) {
            setDisableButton(false);
        }

        if (array.length > 0) {
            setDisableButton(false);
        }
    }, [value, array]);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    const addElement = async (item: string) => {
        setDisableButton(true);
        stack.current.push({ value: item, state: ElementStates.Changing });
        update({});
        await delay(500);
        setValue('');
        stack.current.changeState(array.length - 1, ElementStates.Default);
        update({});
    }

    const deleteElement = async () => {
        stack.current.changeState(array.length - 1, ElementStates.Changing);
        update({});
        await delay(500);
        stack.current.pop();
        update({});

        if (array.length < 1) {
            setDisableButton(true);
        }
    }

    const reset = () => {
        stack.current.reset();
        setDisableButton(true);
    }

    return (
    <SolutionLayout title="Стек">
        <div className={styles.formContainer}>
          <Input
              maxLength={4}
              isLimitText={true}
              placeholder={'Введите текст'}
              onChange={onChange}
              value={value}
          />
          <Button
              text={'Добавить'}
              disabled={disableButton}
              onClick={() => addElement(value)}
          />
          <Button
              text={'Удалить'}
              extraClass={'mr-40'}
              disabled={!array.length}
              onClick={() => deleteElement()}
          />
          <Button
              text={'Очистить'}
              disabled={!array.length}
              onClick={reset}
          />
        </div>
        <div className={styles.circlesContainer}>
            {
                array && array.map((item, index) => {
                return (
                    <Circle
                    letter={String(item.value)}
                    index={index}
                    key={index}
                    head={index === array.length - 1 ? 'top' : ''}
                    state={item.state}
                />
                )
            })
            }
        </div>
    </SolutionLayout>
  );
};