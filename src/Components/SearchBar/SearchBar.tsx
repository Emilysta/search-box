import SingleFilterBox from "Components/SingleFilterBox/SingleFilterBox";
import React, { useEffect, useRef, useState } from "react";
import './SearchBar.css';
import { Search, ArrowReturnLeft } from 'react-bootstrap-icons';
import { filterData } from 'Utils/Filter';
import KeyInfo from "Components/KeyInfo/KeyInfo";

export type SearchBarProps = {
    data: any[],
    filterFunction: (object: any) => string,
    filtersChanged?: (data: any[]) => void,
    maxHints?: number;
}

export default function SearchBar(props: SearchBarProps) {
    const [convertedData, setConvertedData] = useState<any[]>(Array(0));
    const [filters, setFilters] = useState<any[]>(Array(0));
    const [hints, setHints] = useState<any[]>(Array(0));
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [search, setSearch] = useState('');
    const inputElement = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (props.data) {
            let newData: any[] = new Array(0);
            props.data.forEach(element => {
                newData.push({ text: props.filterFunction(element), data: element });
            });
            setConvertedData(newData);
            setHints(newData.slice(0, 10));
            setFilters(Array(0));
        }
    }, [props.data])

    useEffect(() => {
        if (props.filtersChanged && filters)
            props.filtersChanged(filters);
    }, [filters])

    useEffect(() => {
        let data = filterData(search, convertedData);
        setHints(data.slice(0, 10));
    }, [search, convertedData])

    function onClose(filterData: any, ind?: number) {
        let index: number;
        index = ind ? ind : filters?.indexOf(filterData);
        if (index > -1) {
            setFilters(filters?.filter((_, i) => i !== index));
            setConvertedData([...convertedData, filterData]);
        }
    }

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSearch(e.target.value);
    }

    function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        let key = e.key;
        let index = selectedIndex;
        let lastIndex = hints.length - 1;
        switch (key) {
            case "ArrowUp": {
                e.preventDefault();
                index -= 1;
                if (index < 0) index = lastIndex;
                setSelectedIndex(index);
                break;
            }
            case "ArrowDown": {
                e.preventDefault();
                index += 1;
                if (index > lastIndex) index = 0;
                setSelectedIndex(index);
                break;
            }
            case "Enter": {
                let filter = hints.at(selectedIndex);
                if (filter && !filters.includes(filter)) {
                    setFilters([...filters, hints.at(selectedIndex)])
                    setConvertedData(convertedData.filter(x => x !== filter));
                    if (inputElement.current)
                        inputElement.current.value = '';
                    setSearch('');
                }
                break;
            }
            case "Tab": {
                e.preventDefault();
                if (search.length > 0 && filters.filter(e => e.text === search).length === 0) {
                    setFilters([...filters, { text: search, data: null }])
                    if (inputElement.current)
                        inputElement.current.value = '';
                    setSearch('');
                }
                break;
            }
        }
    }

    function onHintSelection(e: React.MouseEvent<HTMLDivElement>) {
        let index = e.currentTarget.getAttribute('data-key');
        if (index)
            setSelectedIndex(parseInt(index));
        if (inputElement.current)
            inputElement.current.focus();
    }

    function onHintDoubleSelection(e: React.MouseEvent<HTMLDivElement>) {
        let filter = hints.at(selectedIndex);
        if (!filters.includes(filter)) {
            setConvertedData(convertedData.filter(x => x !== filter));
            setFilters([...filters, hints.at(selectedIndex)])

        }
        if (inputElement.current)
            inputElement.current.focus();
    }

    return (
        <div className={`search-box`} >
            <div className="search-bar-box">
                {
                    filters?.map((element, i) => {
                        return (
                            <SingleFilterBox filterData={element} onCloseAction={onClose} key={i} index={i} />
                        )
                    })
                }
                <Search className="search-icon" />
                <input className='search-input' type='search' placeholder='Search here' onChange={onChange} onKeyDown={onKeyDown} ref={inputElement} />
                <div className="navigation-info-box">
                    <KeyInfo keyText="⭲ Tab" info="Add tag" />
                    <KeyInfo keyText="↲ Enter" info="Choose tag from list" />
                    <KeyInfo keyText="ᛨ Arrows" info="Navigate" />
                    <KeyInfo keyText="Mouse Click" info="Choose tag from list" />
                    <KeyInfo keyText="Mouse Dbl Click" info="Add tag" />
                </div>
            </div>
            <div className={`search-dropdown`}>
                {
                    hints?.map((element, i) => {
                        const start: number = element.text.toUpperCase().search(search.toUpperCase());
                        const finish: number = start + search.length;
                        return (
                            <div className={`hint ${i === selectedIndex ? 'focused' : ''}`} key={i} data-key={i} onClick={onHintSelection} onDoubleClick={onHintDoubleSelection} tabIndex={1}>
                                <p>
                                    {element.text.substring(0, start)}
                                    <strong>{element.text.substring(start, finish)}</strong>
                                    {element.text.substring(finish)}
                                </p>
                                {i === selectedIndex && <div className="hint-enter-icon"><p style={{ fontSize: '12px' }}>Enter</p> <ArrowReturnLeft /></div>}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

