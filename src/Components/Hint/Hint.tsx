import styles from './Hint.module.css';
import { ArrowReturnLeft } from 'react-bootstrap-icons';
import { FilterData } from 'Utils/Filter';

type HintProps<T> = {
    isSelected?: boolean,
    hintData: FilterData<T>,
    onHintSelection?: (e: React.MouseEvent<HTMLButtonElement>, index?: number) => void;
    onDoubleHintSelection?: (e: React.MouseEvent<HTMLButtonElement>, index?: number) => void;
    hintIndex?: number,
    searchText?: string,
}

export default function Hint<T>(props: HintProps<T>) {

    function onClick(e: React.MouseEvent<HTMLButtonElement>) {
        if (props.onHintSelection)
            props.onHintSelection(e, props.hintIndex);
    }

    function onDoubleClick(e: React.MouseEvent<HTMLButtonElement>) {
        if (props.onDoubleHintSelection)
            props.onDoubleHintSelection(e, props.hintIndex);
    }


    const hintText = () => {
        const text = props.hintData.text;
        if (props.searchText) {
            const start = text.toUpperCase().indexOf(props.searchText.toUpperCase());
            const finish = start + props.searchText.length;
            return (<p>
                {text.substring(0, start)}
                <strong>{text.substring(start, finish)}</strong>
                {text.substring(finish)}
            </p>)
        }
        else {
            return (<p>{text}</p>)
        }
    }

    return (
        <button className={`${styles.hint} ${props.isSelected ? styles.selected : ''}`}
            onClick={onClick} onDoubleClick={onDoubleClick}>
            {hintText()}
            {props.isSelected &&
                <div className={styles.hint_enter_icon}>
                    <p>Enter</p>
                    <ArrowReturnLeft />
                </div>}
        </button>
    )
}
