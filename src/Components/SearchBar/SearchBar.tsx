import Hint from "Components/Hint/Hint";
import KeyInfo from "Components/KeyInfo/KeyInfo";
import SingleFilterBox from "Components/SingleFilterBox/SingleFilterBox";
import Snackbar from "Components/Snackbar/Snackbar";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Search } from 'react-bootstrap-icons';
import { FilterData, filterData } from 'Utils/Filter';
import { useSnackbar } from "Utils/SnackbarHook";
import styles from './SearchBar.module.css';

type SearchBarProps<T> = {
    data: T[],
    convertDataCallback: (objectToConvert: T) => string,
    filtersChanged?: (filters: FilterData<T>[]) => void,
}

export default function SearchBar<T>(props: SearchBarProps<T>) {
    const [convertedData, setConvertedData] = useState<FilterData<T>[]>([]);
    const [filters, setFilters] = useState<FilterData<T>[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [search, setSearch] = useState('');
    const [showSnackbar] = useSnackbar('errorText');
    const inputRef = useRef<HTMLInputElement>(null);

    const hints = useMemo(() =>
        filterData(search, convertedData).slice(0, 10),
        [search, convertedData])

    useEffect(() => {
        if (props.data && Array.isArray(props.data)) {
            const newData: FilterData<T>[] = [];
            props.data.forEach(element => {
                newData.push({ text: props.convertDataCallback(element), data: element });
            });
            setConvertedData(newData);
            setFilters([]);
        }
    }, [props.data])

    useEffect(() => {
        if (props.filtersChanged && filters)
            props.filtersChanged(filters);
    }, [filters])

    function onFilterDelete(filter: FilterData<T>, indexInList?: number) {
        const index = indexInList ? indexInList : filters.indexOf(filter);
        if (index > -1) {
            setFilters(filters.filter((_, i) => i !== index));
            setConvertedData([...convertedData, filter]);
        }
        if (inputRef.current)
            inputRef.current.focus();
    }

    function modifySelectedIndex(increment: boolean) {
        const lastIndex = hints.length - 1;
        const index = increment ? selectedIndex + 1 : selectedIndex - 1;
        setSelectedIndex(Math.min(Math.max(index, -1), lastIndex));
    }

    function addFilter(filter: FilterData<T>, modifyConverted: boolean = true, clearInput: boolean = true) {
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
                modifySelectedIndex(false);
                break;
            }
            case "ArrowDown": {
                e.preventDefault();
                modifySelectedIndex(true);
                break;
            }
            case "Enter": {
                if (selectedIndex >= 0 && selectedIndex < hints.length) {
                    const filter = hints[selectedIndex];
                    if (filter && !filters.includes(filter)) {
                        addFilter(filter);
                    }
                }
                else if (selectedIndex === -1 || hints.length === 0) {
                    addNewFilter();
                }
                setSelectedIndex(-1);
                break;
            }
        }
    }

    function onHintSelection(index?: number) {
        if (index !== undefined && index >= 0)
            setSelectedIndex(index);
        if (inputRef.current)
            inputRef.current.focus();
    }

    function onHintDoubleSelection() {
        if (selectedIndex >= 0 && selectedIndex < hints.length) {
            const filter = hints[selectedIndex];
            if (filter && !filters.includes(filter)) {
                addFilter(filter, true, false);
            }
        }
        if (inputRef.current)
            inputRef.current.focus();
    }

    return (
        <>
            <div className={styles.search_box} >
                <div className={styles.search_bar_box}>
                    <div data-testid='testFiltersList' className={styles.filters_box}>
                        {
                            filters?.map((element, i) => {
                                return (
                                    <SingleFilterBox filterData={element} onFilterDelete={onFilterDelete} key={i} index={i} />
                                )
                            })
                        }
                    </div>
                    <Search className={styles.search_icon} />
                    <input className={styles.search_input} type='search' placeholder='Search here' onChange={(e) => setSearch(e.target.value)} onKeyDown={onKeyDown} value={search} ref={inputRef} data-testid="searchBarInput" />
                    <div className={styles.navigation_info_box}>
                        <KeyInfo keyText="↲ Enter" info="Choose tag from list or add currently typed tag if neither is selected" />
                        <KeyInfo keyText="ᛨ Arrows" info="Navigate" />
                        <KeyInfo keyText="Mouse Click" info="Choose tag from list" />
                        <KeyInfo keyText="Mouse Dbl Click" info="Add tag" />
                    </div>
                </div>
                <div className={styles.search_dropdown} data-testid="testHintsList">
                    {
                        hints?.map((hint, i) => {
                            return (
                                <Hint hintData={hint} isSelected={i === selectedIndex} hintIndex={i} key={i} searchText={search} onHintSelection={(_, index) => onHintSelection(index)} onDoubleHintSelection={onHintDoubleSelection} />
                            )
                        })
                    }
                </div>
            </div>
            <Snackbar id='errorText' />
        </>
    )
}

