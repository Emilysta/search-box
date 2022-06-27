import styles from './SingleFilterBox.module.css';
import { XLg } from 'react-bootstrap-icons';

type SingleFilterBoxProps = {
    filterData: any;
    index?: number,
    onCloseAction: (filterData: any, index?: number) => void,
}

export default function SingleFilterBox(props: SingleFilterBoxProps) {
    let text = props.filterData?.text;

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
