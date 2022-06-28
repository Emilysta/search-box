import styles from './Hint.module.css';
import { ArrowReturnLeft } from 'react-bootstrap-icons';
import { FilterData } from 'Utils/Filter';

type HintProps = {
    isSelected?: boolean,
    hintData: FilterData,
    onHintSelection?: (e: React.MouseEvent<HTMLButtonElement>, index?: number) => void; //toDo
    onDoubleHintSelection?: (e: React.MouseEvent<HTMLButtonElement>, index?: number) => void;
    hintIndex?: number,
    searchText?: string,
}

export default function Hint(props: HintProps) {

    function onClick(e: React.MouseEvent<HTMLButtonElement>) {
        if (props.onHintSelection)
            props.onHintSelection(e, props.hintIndex);
    }

    function onDoubleClick(e: React.MouseEvent<HTMLButtonElement>) {
        if (props.onDoubleHintSelection)
            props.onDoubleHintSelection(e, props.hintIndex);
    }

    const text = props.hintData.text;
    const hintText = () => {
        if (props.searchText) {
            const start = text.toUpperCase().search(props.searchText.toUpperCase());
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
        <button className={`${styles.hint} ${props.isSelected ? styles.focused : ''}`}
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
