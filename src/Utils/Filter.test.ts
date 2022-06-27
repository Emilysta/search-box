import { FilterData, filterData } from './Filter';
import { convertTags } from './ConvertFunctions';


describe('testing filterData function', () => {
    const data = require('../Utils/Tags.json');
    const convertedData: FilterData[] = [];
    data.forEach((el: any) => {
        convertedData.push({ text: convertTags(el), data: el });
    });

    test('empty string should result in return data', () => {
        const searchText = '';
        expect(filterData(searchText, convertedData)).toEqual(convertedData);
    });

    test('"javascript" string should result in array with text "javascript"', () => {
        const searchText = 'javascript';
        expect(filterData(searchText, convertedData)).toEqual([{ data: 'javascript', text: "javascript" }]);
    });
});