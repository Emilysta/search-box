import { useEffect, useState } from "react";
import './SearchBar.css';

export type SearchBarProps = {
    data: any[],
    filterFunction: (object: any) => string,
    filtersChanged?: (data: any[]) => void,
}

export default function SearchBar(props: SearchBarProps) {
    const [convertedData, setConvertedData] = useState<any[]>();
    const [filters, setFilters] = useState<any[]>();
    const [hints, setHints] = useState<any[]>();

    useEffect(() => {
        let newData: any[] = new Array(0);
        let a: any[] = new Array(0);

        let i: number = 0;
        props.data.forEach(element => {
            newData.push({ text: props.filterFunction(element), data: element });
            if (i < 20)
                a.push({ text: props.filterFunction(element), data: element });
            i++;
        });
        setHints(a)
        setFilters(a)
        setConvertedData(newData);
    }, [props.data])

    return (
        <div className="search-box">
            <div className="search-bar-box">
                {/* {
                    filters?.map((element) => {
                        return (
                            <p>
                                {element.text}
                            </p>
                        )
                    })
                } */}
                <input className="search-bar" type='text' />
            </div>
            <div className={`search-dropdown ${hints ? 'visible' : ''}`}>
                {
                    hints?.map((element) => {
                        return (
                            <p>
                                {element.text}
                            </p>
                        )
                    })
                }
            </div>
        </div>
    )
}
