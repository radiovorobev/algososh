import React, {ChangeEvent} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {delay} from "../../utils/utils";
import {ElementStates} from "../../types/element-states";
import {HEAD, TAIL} from "../../constants/element-captions";
import {Queue} from "./utils";

export const QueuePage: React.FC = () => {
  const [disabledAdd, setDisabledAdd] = React.useState(true);
  const [cleared, setCleared] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [loader, setLoader] = React.useState({ add: false, delete: false });

  const queue = React.useRef(new Queue(7));
  const data = queue.current.getData();

  React.useEffect(() => {
    if (value.length > 0) {
      setDisabledAdd(false);
    }
  }, [value, data.tail]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  const addElement = async (item: string) => {
    queue.current.enqueue({ value: item, state: ElementStates.Changing });
    setLoader({ ...loader, add: true });

    await delay(SHORT_DELAY_IN_MS);
    queue.current.changeState(data.tail !== null && data.tail < 6 ? data.tail + 1 : 0, ElementStates.Default);
    setValue('');
    setDisabledAdd(true);
    setCleared(false);
    setLoader({ ...loader, add: false });
  }

  const deleteElement = async () => {
    queue.current.changeState(data.head !== null ? data.head : 0, ElementStates.Changing);
    setLoader({ ...loader, delete: true });
    await delay(SHORT_DELAY_IN_MS);
    queue.current.dequeue();
    setLoader({ ...loader, delete: false });
  }

  const reset = () => {
    queue.current.reset();
    setCleared(true);
  }
  return (
      <SolutionLayout title="Очередь">
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
              disabled={disabledAdd}
              onClick={() => addElement(value)}
              isLoader={loader.add}
          />
          <Button
              text={'Удалить'}
              extraClass={'mr-40'}
              disabled={loader.add || data.tail == null}
              onClick={() => deleteElement()}
              isLoader={loader.delete}
          />
          <Button
              text={'Очистить'}
              disabled={cleared}
              onClick={reset}
          />
        </div>
        <div className={styles.circlesContainer}>
          {data.array &&
              data.array.map((item, index) => {
                return (
                    <Circle
                        key={index}
                        letter={String(item.value)}
                        index={index}
                        state={item.state}
                        tail={index === data.tail ? TAIL : ''}
                        head={index === data.head ? HEAD : ''}
                    />
                )
              })
          }
        </div>
      </SolutionLayout>
  );
};