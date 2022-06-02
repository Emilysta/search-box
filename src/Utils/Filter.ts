function startsWith(text: string, toTest: string): boolean {
    let regex = new RegExp(`^${text}`);
    return regex.test(toTest);
}

function endsWith(text: string, toTest: string): boolean {
    let regex = new RegExp(`${text}$`);
    return regex.test(toTest);
}

function contains(text: string, toTest: string): boolean {
    let regex = new RegExp(`${text}`);
    return regex.test(toTest);
}

export function filterData(text: string, data: any[]): any[] {
    if (text.length === 0)
        return data;
    let filteredData1 = data.filter(element => startsWith(text, element.text));
    let filteredData2 = data.filter(element => contains(text, element.text));
    let filteredData3 = data.filter(element => endsWith(text, element.text));
    let filteredData = filteredData1.concat(filteredData2, filteredData3);
    return filteredData;
}