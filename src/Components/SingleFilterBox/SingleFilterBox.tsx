import './SingleFilterBox.css';
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
        <div className="filter-box">
            <p title={text}>{text ?? 'no text'}</p>
            <XLg onClick={onCloseFilter} className="close-button" />
        </div>
    )
}
