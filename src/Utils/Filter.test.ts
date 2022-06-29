import { FilterData, filterData } from './Filter';
import { convertTags } from './ConvertFunctions';


describe('testing filterData function', () => {
    const data = require('../Utils/Tags.json');
    const convertedData: FilterData<string>[] = [];
    data.forEach((el: string) => {
        convertedData.push({ text: convertTags(el), data: el });
    });

    test('empty string should result in full data array', () => {
        const searchText = '';
        expect(filterData(searchText, convertedData)).toEqual(convertedData);
    });

    test('"javascript" string should result in array with text "javascript"', () => {
        const searchText = 'javascript';
        expect(filterData(searchText, convertedData)).toEqual([{ data: 'javascript', text: "javascript" }]);
    });

    test('"javascripts" string should result in empty array', () => {
        const searchText = 'javascripts';
        expect(filterData(searchText, convertedData)).toEqual([]);
    });

    test('"css" string should result in array with more than 1 element', () => {
        const searchText = 'css';
        expect(filterData(searchText, convertedData)).toHaveLength(2);
    });

    test('string with special characters should result in empty array and not throw exception', () => {
        const searchText = '~`@#%&:;"\'.*+?^${}()[]|/\\';
        expect(() => filterData(searchText, convertedData)).not.toThrow();
        expect(filterData(searchText, convertedData)).toEqual([]);
    });
});