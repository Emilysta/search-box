import styles from './SingleFilterBox.module.css';
import { XLg } from 'react-bootstrap-icons';
import { FilterData } from 'Utils/Filter';

type SingleFilterBoxProps = {
    filterData: FilterData;
    index?: number,
    onCloseAction: (filterData: FilterData, index?: number) => void,
}

export default function SingleFilterBox(props: SingleFilterBoxProps) {
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
