import renderer from "react-test-renderer";
import {Circle} from "./circle";
import {ElementStates} from "../../../types/element-states";

describe("Circle test OK", () => {

    it('Circle w/o letter OK', () => {
        const tree = renderer.create(<Circle />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Circle with letters OK', () => {
        const tree = renderer.create(<Circle letter='10'/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Circle with head OK', () => {
        const tree = renderer.create(<Circle head='Head'/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Circle with React-head OK', () => {
        const tree = renderer.create(<Circle head={<Circle />}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Circle with tail OK', () => {
        const tree = renderer.create(<Circle tail='Tail'/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Circle with React-tail OK', () => {
        const tree = renderer.create(<Circle tail={<Circle />}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Circle with index OK', () => {
        const tree = renderer.create(<Circle index={7}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('small Circle OK', () => {
        const tree = renderer.create(<Circle isSmall={true}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Circle Default OK', () => {
        const tree = renderer.create(<Circle state={ElementStates.Default}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Circle Changing OK', () => {
        const tree = renderer.create(<Circle state={ElementStates.Changing}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Circle Modified OK', () => {
        const tree = renderer.create(<Circle state={ElementStates.Modified}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});