import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import {StringComponent} from "./string";
import {DELAY_IN_MS} from "../../constants/delays";


describe('Алгоритм разворота строки: ', () => {
    const reverseAlgTest = (value: string, reversedValue: string) => {
        return async () => {
            render(<StringComponent />);

            const input = screen.getByTestId('input');
            const button = screen.getByTestId('button');
            const result = screen.getAllByTestId('circle').forEach(el => result + (el.textContent || ''));

            fireEvent.change(input, { target: { value } });
            fireEvent.click(button);

            await waitFor(() => {
                expect(result).toBe(reversedValue);
            }, { timeout: DELAY_IN_MS })
        }
    }

    it('Корректно развернута строка с чётным количеством символов', () => {
        reverseAlgTest("abcdef", "fedcba");
    })

    it('Корректно развернута строка с нечетным количеством символов', () => {
        reverseAlgTest("abcde", "edcba");
    })

    it('Алкортим работает корректно со строкой с одним символом', () => {
        reverseAlgTest('a', 'a');
    })

    it('Алгоритм работает корректно с пустой строкой', () => {
        reverseAlgTest('', '');
    })
})