import { useEffect, useState } from "react"
export type SearchBarProps = {
    data: any[],
    filterFunction: (object: any) => string,
    filtersChanged?: (data: any[]) => void,
}

export default function SearchBar(props: SearchBarProps) {
    const [convertedData, setConvertedData] = useState<any[]>();
    const [filters, setFilters] = useState<any[]>();

    useEffect(() => {
        let newData: any[] = new Array(0);
        props.data.forEach(element => {
            newData.push({ text: props.filterFunction(element), data: element });
        });
        console.log(newData);
        setConvertedData(newData);
    }, [])

    return (
        <div>SearchBar</div>
    )
}
