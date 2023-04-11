import renderer from "react-test-renderer";
import {Button} from "./button";
import {screen, fireEvent, render} from "@testing-library/react";

describe("Button test OK", () => {

    it('Button with text OK', () => {
        const tree = renderer.create(<Button text='Текст кнопки' />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Button w/o text OK', () => {
        const tree = renderer.create(<Button />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('disabled Button OK', () => {
        const tree = renderer.create(<Button disabled />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('loading Button OK', () => {
        const tree = renderer.create(<Button isLoader={true} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('clicked Button OK', () => {
        const mockOnClick = jest.fn();
        render(<Button text='Текст кнопки' onClick={mockOnClick} />);
        const button = screen.getByText('Текст кнопки');
        fireEvent.click(button);
        expect(mockOnClick).toHaveBeenCalled();
    });
});