import SingleFilterBox from "Components/SingleFilterBox/SingleFilterBox";
import React, { useEffect, useMemo, useRef, useState } from "react";
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
    filtersChanged?: (data: FilterData[]) => void,
    maxHints?: number;
}

export default function SearchBar(props: SearchBarProps) {
    const [convertedData, setConvertedData] = useState<FilterData[]>([]);
    const [filters, setFilters] = useState<FilterData[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [search, setSearch] = useState('');
    const [showSnackbar] = useSnackbar('errorText');

    const hints = useMemo(() =>
        filterData(search, convertedData).slice(0, 10),
        [search, convertedData])

    useEffect(() => {
        if (props.data) {
            const newData: FilterData[] = [];
            props.data.forEach(element => {
                newData.push({ text: props.convertFunction(element), data: element });
            });
            setConvertedData(newData);
            setFilters([]);
        }
    }, [props.data])

    useEffect(() => {
        if (props.filtersChanged && filters)
            props.filtersChanged(filters);
    }, [filters])

    function onClose(filterData: FilterData, ind?: number) {
        const index = ind ? ind : filters?.indexOf(filterData);
        if (index > -1) {
            setFilters(filters?.filter((_, i) => i !== index));
            setConvertedData([...convertedData, filterData]);
        }
    }

    function modifyIndex(increment: boolean) {
        let index = selectedIndex;
        const lastIndex = hints.length - 1;
        if (increment)
            index += 1;
        else
            index -= 1;
        index = Math.min(Math.max(index, 0), lastIndex);
        setSelectedIndex(index);
    }

    function addFilter(filter: FilterData, modifyConverted: boolean = true, clearInput: boolean = true) {
        setFilters([...filters, filter])
        if (modifyConverted) setConvertedData(convertedData.filter(x => x !== filter));
        if (clearInput) setSearch('');
    }

    function addNewFilter() {
        const searchToUpper = search.toUpperCase();
        const hint = hints.filter(e => e.text.toUpperCase() === searchToUpper);
        if (hint.length > 0) {
            addFilter(hint[0]);
        }
        if (search.length > 0 && filters.filter(e => e.text.toUpperCase() === searchToUpper).length === 0) {
            addFilter({ text: search, data: null }, false);
        }
        else {
            showSnackbar('Already chosen');
        }
    }

    function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        const key = e.key;
        switch (key) {
            case "ArrowUp": {
                e.preventDefault();
                modifyIndex(false);
                break;
            }
            case "ArrowDown": {
                e.preventDefault();
                modifyIndex(true);
                break;
            }
            case "Enter": {
                const filter = hints.at(selectedIndex);
                if (filter && !filters.includes(filter)) {
                    addFilter(filter);
                }
                break;
            }
            case "Tab": {
                e.preventDefault();
                addNewFilter();
                break;
            }
        }
    }

    function onHintSelection(e: React.MouseEvent<HTMLButtonElement>, index?: number) {
        if (index !== undefined && index >= 0)
            setSelectedIndex(index);
        // if (inputElement.current)
        //     inputElement.current.focus();
    }

    function onHintDoubleSelection(e: React.MouseEvent<HTMLButtonElement>) {
        const filter = hints.at(selectedIndex);
        if (filter && !filters.includes(filter)) {
            addFilter(filter, true, false);
        }
        // if (inputElement.current)
        //     inputElement.current.focus();
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
                    <input className={styles.search_input} type='search' placeholder='Search here' onChange={(e) => setSearch(e.target.value)} onKeyDown={onKeyDown} value={search} />
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

