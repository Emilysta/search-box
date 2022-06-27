export function filterData(searchText: string, data: FilterData[]) {
    if (searchText.length === 0)
        return data;
    let lastIndexOfFirst = 0;
    let lastIndexOfSecond = 0;

    const searchLegth = searchText.length;
    return data.reduce((result: FilterData[], element: FilterData) => {
        const index = element.text.toLowerCase().indexOf(searchText.toLowerCase());
        if (index === -1)
            return result;
        if (index === 0) {
            result.splice(lastIndexOfFirst, 0, element);
            lastIndexOfFirst += 1;
            lastIndexOfSecond += 1;
        }
        else if (index + searchLegth - 1 === element.text.length - 1)
            result.push(element);
        else {
            result.splice(lastIndexOfSecond, 0, element);
            lastIndexOfSecond += 1;
        }
        return result;
    }, []);
}

export type FilterData = {
    text: string,
    data: any,
}