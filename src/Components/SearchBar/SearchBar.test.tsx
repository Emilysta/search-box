import SearchBar from './SearchBar';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { convertTags } from 'Utils/ConvertFunctions';
import userEvent from '@testing-library/user-event';

describe('testing SearchBarComponent', () => {
    const json = require('Utils/Tags.json');
    test('renders without errors', () => {
        render(<SearchBar data={json} convertDataCallback={convertTags} />);
    });

    test('after "javas" input there is one hint', async () => {
        render(<SearchBar data={json} convertDataCallback={convertTags} />);
        const input = screen.getByTestId(/searchBarInput/);
        userEvent.type(input, 'javas');
        const hintsList = screen.getByTestId(/testHintsList/);

        expect(hintsList.childElementCount).toEqual(1);
        const hint = screen.getByRole('button');
        expect(hint).toHaveTextContent('javascriptEnter');
    });

    test('after "javas" input and enter click there is one filter with "javascript"', async () => {
        render(<SearchBar data={json} convertDataCallback={convertTags} />);
        const input = screen.getByTestId(/searchBarInput/);
        userEvent.type(input, 'javas{Enter}');
        const filtersList = screen.getByTestId(/testFiltersList/);
        expect(filtersList.childElementCount).toEqual(1);
        expect(filtersList.childNodes[0]).toHaveTextContent('javascript');
    });

    test('after deleting filter there is one less filter', async () => {
        render(<SearchBar data={json} convertDataCallback={convertTags} />);
        const input = screen.getByTestId(/searchBarInput/);
        userEvent.type(input, 'javas{Enter}');
        const filtersList = screen.getByTestId(/testFiltersList/);
        expect(filtersList.childElementCount).toEqual(1);
        const jsFilterButton = screen.getByTitle('javascript');
        userEvent.click(jsFilterButton);
        expect(filtersList.childElementCount).toEqual(0);
    });
})

