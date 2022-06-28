import styles from './SingleFilterBox.module.css';
import { XLg } from 'react-bootstrap-icons';
import { FilterData } from 'Utils/Filter';

type SingleFilterBoxProps<T> = {
    filterData: FilterData<T>;
    index?: number,
    onCloseAction: (filterData: FilterData<T>, index?: number) => void,
}

export default function SingleFilterBox<T>(props: SingleFilterBoxProps<T>) {
    const text = props.filterData.text;

    function onCloseFilter() {
        if (props.onCloseAction)
            props.onCloseAction(props.filterData, props.index);
    }

    return (
        <div className={styles.filter_box}>
            <p title={text}>{text ?? 'no text'}</p>
            <button className={styles.close_button} onClick={onCloseFilter}><XLg /></button>
        </div>
    )
}
