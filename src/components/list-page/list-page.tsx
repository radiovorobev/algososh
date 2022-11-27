import React, {ChangeEvent, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {ElementStates} from "../../types/element-states";
import {Circle} from "../ui/circle/circle";
import {ArrowIcon} from "../ui/icons/arrow-icon";
import {HEAD, TAIL} from "../../constants/element-captions";
import {delay} from "../../utils/utils";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {defaultArray, LinkedList} from "./utils";

export const ListPage: React.FC = () => {
  const [inputValues, setInputValues] = useState({ value: '', index: '' });
  const [addCircle, setAddCircle] = React.useState({ index: -1, element: { value: '', state: ElementStates.Changing } });
  const [deleteCircle, setDeleteCircle] = React.useState({ index: -1, element: { value: '', state: ElementStates.Changing } })
  const [disabled, setDisabled] = useState(false);
  const [addLoader, setAddLoader] = useState({ index: false, tail: false, head: false });
  const [deleteLoader, setDeleteLoader] = useState({ index: false, tail: false, head: false });
  const [, update] = React.useState({});

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValues({ ...inputValues, [event.target.name]: event.target.value });
  };

  const linkedList = React.useRef(new LinkedList(defaultArray));
  const data = linkedList.current.getData();

  const addTail = async (item: string) => {
    setDisabled(true);
    setAddLoader({ ...addLoader, tail: true });
    setAddCircle({ index: data.array.length - 1, element: { value: item, state: ElementStates.Changing } });

    await delay(SHORT_DELAY_IN_MS);

    linkedList.current.append({ value: item, state: ElementStates.Modified });
    setInputValues({ ...inputValues, value: '' });
    setAddCircle({ ...addCircle, index: -1 });

    await delay(SHORT_DELAY_IN_MS);

    linkedList.current.changeState(data.array.length - 1, ElementStates.Default);
    setDisabled(false);
    setAddLoader({ ...addLoader, tail: false });
  }

  const addHead = async (item: string) => {
    setDisabled(true);
    setAddLoader({ ...addLoader, head: true });
    setAddCircle({ index: 0, element: { value: item, state: ElementStates.Changing } });

    await delay(SHORT_DELAY_IN_MS);

    linkedList.current.prepend({ value: item, state: ElementStates.Modified });
    setInputValues({ ...inputValues, value: '' });
    setAddCircle({ ...addCircle, index: -1 });

    await delay(SHORT_DELAY_IN_MS);

    linkedList.current.changeState(0, ElementStates.Default);
    setDisabled(false);
    setAddLoader({ ...addLoader, head: false });
  }

  const addByIndex = async (index: number, item: string) => {
    setDisabled(true);
    setAddLoader({ ...addLoader, index: true });
    setAddCircle({ ...addCircle, element: { value: item, state: ElementStates.Changing } });

    for (let i = 0; i <= index; i++) {
      setAddCircle({ index: i, element: { value: item, state: ElementStates.Changing } });

      if (i > 0) {
        linkedList.current.changeState(i - 1, ElementStates.Changing);
        update({});
      }

      await delay(SHORT_DELAY_IN_MS);

      if (i === index) {
        linkedList.current.addByIndex(index, { value: item, state: ElementStates.Modified });
        setAddCircle({ ...addCircle, index: -1 });
        setInputValues({ index: '', value: '' });
      }
    }

    await delay(SHORT_DELAY_IN_MS);

    for (let i = 0; i <= index; i++) {
      linkedList.current.changeState(i, ElementStates.Default);
    }
    setDisabled(false);
    setAddLoader({ ...addLoader, index: false });
  }

  const deleteTail = async () => {
    setDisabled(true);
    setDeleteLoader({ ...deleteLoader, tail: true });
    linkedList.current.changeState(data.array.length - 1, ElementStates.Changing);
    setDeleteCircle({ index: data.array.length - 1, element: { value: data.tail?.element.value || '', state: ElementStates.Changing } });
    linkedList.current.changeValue(data.array.length - 1);

    await delay(SHORT_DELAY_IN_MS);

    linkedList.current.deleteTail();
    setDeleteCircle({ ...deleteCircle, index: -1 });
    setDisabled(false);
    setDeleteLoader({ ...deleteLoader, tail: false });
  }

  const deleteHead = async () => {
    setDisabled(true);
    setDeleteLoader({ ...deleteLoader, head: true });
    linkedList.current.changeState(0, ElementStates.Changing);
    setDeleteCircle({ index: 0, element: { value: data.head?.element.value || '', state: ElementStates.Changing } });
    linkedList.current.changeValue(0);

    await delay(SHORT_DELAY_IN_MS);

    linkedList.current.deleteHead();
    setDeleteCircle({ ...deleteCircle, index: -1 });
    setDisabled(false);
    setDeleteLoader({ ...deleteLoader, head: false });
  }

  const deleteByIndex = async (index: number) => {
    setDisabled(true);
    setDeleteLoader({ ...deleteLoader, index: true });
    for (let i = 0; i <= index; i++) {
      linkedList.current.changeState(i, ElementStates.Changing);
      update({});

      await delay(SHORT_DELAY_IN_MS);

      if (i === index) {
        setDeleteCircle({ index: i, element: { value: data.array[index].element.value, state: ElementStates.Changing } });
        linkedList.current.changeValue(index);
        update({});
      }
    }

    await delay(SHORT_DELAY_IN_MS);
    linkedList.current.deleteByIndex(index);
    setDeleteCircle({ ...deleteCircle, index: -1 });
    setInputValues({ ...inputValues, index: '' });

    for (let i = 0; i <= index - 1; i++) {
      linkedList.current.changeState(i, ElementStates.Default);
    }
    setDisabled(false);
    setDeleteLoader({ ...deleteLoader, index: false });
  }

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.formContainer}>
        <Input
            isLimitText={true}
            maxLength={4}
            extraClass={`${styles.inputWidth}`}
            onChange={onInputChange}
            name="value"
            disabled={disabled}
            value={inputValues.value}
        />
        <Button text={'Добавить в head'}
                onClick={() => addHead(inputValues.value)}
                disabled={disabled ? true : !inputValues.value}
                isLoader={addLoader.head}
        />
        <Button text={'Добавить в tail'}
                onClick={() => addTail(inputValues.value)}
                disabled={disabled ? true : !inputValues.value}
                isLoader={addLoader.tail}
        />
        <Button text={'Удалить из head'}
                onClick={deleteHead}
                disabled={disabled ? true : data.array.length <= 0}
                isLoader={deleteLoader.head}
        />
        <Button text={'Удалить из tail'}
                onClick={deleteTail}
                disabled={disabled ? true : data.array.length <= 0}
                isLoader={deleteLoader.tail}
        />
          <Input
              placeholder={'Введите индекс'}
              extraClass={`${styles.inputWidth}`}
              onChange={onInputChange}
              name='index'
              min={0}
              max={data.array.length - 1}
              disabled={disabled}
              value={inputValues.index}
          />
          <Button text={'Добавить по индексу'}
                  extraClass={`${styles.buttonWidth}`}
                  onClick={() => addByIndex(Number(inputValues.index), inputValues.value)}
                  disabled={disabled ? true : !(inputValues.index && data.array.length > Number(inputValues.index) && inputValues.value)}
                  isLoader={addLoader.index}
          />
          <Button text={'Удалить по индексу'}
                  extraClass={`${styles.buttonWidth}`}
                  onClick={() => deleteByIndex(Number(inputValues.index))}
                  disabled={disabled ? true : !(inputValues.index && data.array.length > Number(inputValues.index))}
                  isLoader={deleteLoader.index}
          />
      </div>
        <div className={styles.circlesContainer}>
          {data.array &&
            data.array.map((item, index) => {
              return (
                  <React.Fragment key={index}>
                    <Circle
                        letter={String(item.element.value)}
                        index={index}
                        state={item.element.state}
                        tail={deleteCircle.index === index ?
                            <Circle letter={deleteCircle.element.value} state={deleteCircle.element.state} isSmall /> :
                            data.tail === item ? TAIL : ''}
                        head={addCircle.index === index ?
                            <Circle letter={addCircle.element.value} state={addCircle.element.state} isSmall /> :
                            data.head === item ? HEAD : ''}
                    />
                    {index !== linkedList.current.array.length - 1 && (
                        <ArrowIcon />
                    )}
                  </React.Fragment>
              )
            })
         }
        </div>
    </SolutionLayout>
  );
};