import styles from './SingleFilterBox.module.css';
import { XLg } from 'react-bootstrap-icons';
import { FilterData } from 'Utils/Filter';

type SingleFilterBoxProps<T> = {
    filterData: FilterData<T>;
    index?: number,
    onFilterDelete: (filterData: FilterData<T>, index?: number) => void,
}

export default function SingleFilterBox<T>(props: SingleFilterBoxProps<T>) {
    const text = props.filterData.text;

    function onClick() {
        if (props.onFilterDelete)
            props.onFilterDelete(props.filterData, props.index);
    }

    return (
        <div className={styles.filter_box}>
            <p>{text ?? 'no text'}</p>
            <button className={styles.close_button} onClick={onClick} title={text}><XLg /></button>
        </div>
    )
}
