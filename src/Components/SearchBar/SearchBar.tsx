import SingleFilterBox from "Components/SingleFilterBox/SingleFilterBox";
import React, { useEffect, useRef, useState } from "react";
import styles from './SearchBar.module.css';
import { Search } from 'react-bootstrap-icons';
import { FilterData, filterData } from 'Utils/Filter';
import KeyInfo from "Components/KeyInfo/KeyInfo";
import Snackbar from "Components/Snackbar/Snackbar";
import { useSnackbar } from "Utils/SnackbarHook";
import Hint from "Components/Hint/Hint";

export type SearchBarProps = {
    data: any[],
    convertFunction: (objectToConvert: any) => string,
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
    const [showSnackbar] = useSnackbar('errorText');

    useEffect(() => {
        if (props.data) {
            let newData: FilterData[] = new Array(0);
            props.data.forEach(element => {
                newData.push({ text: props.convertFunction(element), data: element });
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
                let hint = hints.filter(e => e.text.toUpperCase() === search.toUpperCase());
                if (hint.length > 0) {
                    setFilters([...filters, hint[0]])
                    setConvertedData(convertedData.filter(x => x !== hint[0]));
                    if (inputElement.current)
                        inputElement.current.value = '';
                    setSearch('');
                }
                if (search.length > 0 && filters.filter(e => e.text.toUpperCase() === search.toUpperCase()).length === 0) {
                    setFilters([...filters, { text: search, data: null }])
                    if (inputElement.current)
                        inputElement.current.value = '';
                    setSearch('');
                }
                else {
                    showSnackbar('Already chosen');
                }
                break;
            }
        }
    }

    function onHintSelection(e: React.MouseEvent<HTMLButtonElement>, index?: number) {
        if (index !== undefined && index >= 0)
            setSelectedIndex(index);
        if (inputElement.current)
            inputElement.current.focus();
    }

    function onHintDoubleSelection(e: React.MouseEvent<HTMLButtonElement>) {
        let filter = hints.at(selectedIndex);
        if (!filters.includes(filter)) {
            setConvertedData(convertedData.filter(x => x !== filter));
            setFilters([...filters, hints.at(selectedIndex)])
        }
        if (inputElement.current)
            inputElement.current.focus();
    }

    return (
        <>
            <div className={styles.search_box} >
                <div className={styles.search_bar_box}>
                    {
                        filters?.map((element, i) => {
                            return (
                                <SingleFilterBox filterData={element} onCloseAction={onClose} key={i} index={i} />
                            )
                        })
                    }
                    <Search className={styles.search_icon} />
                    <input className={styles.search_input} type='search' placeholder='Search here' onChange={onChange} onKeyDown={onKeyDown} ref={inputElement} />
                    <div className={styles.navigation_info_box}>
                        <KeyInfo keyText="⭲ Tab" info="Add currently typed tag" />
                        <KeyInfo keyText="↲ Enter" info="Choose tag from list" />
                        <KeyInfo keyText="ᛨ Arrows" info="Navigate" />
                        <KeyInfo keyText="Mouse Click" info="Choose tag from list" />
                        <KeyInfo keyText="Mouse Dbl Click" info="Add tag" />
                    </div>
                </div>
                <div className={styles.search_dropdown}>
                    {
                        hints?.map((hint, i) => {
                            return (
                                <Hint hintData={hint} isSelected={i === selectedIndex} hintIndex={i} key={i} onHintSelection={onHintSelection} onDoubleHintSelection={onHintDoubleSelection} />
                            )
                        })
                    }
                </div>
            </div>
            <Snackbar id='errorText' />
        </>
    )
}

