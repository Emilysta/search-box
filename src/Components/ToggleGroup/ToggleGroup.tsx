import './ToggleGroup.css';

type ToggleGroupProps = {
    buttonsList: string[],
    onSelectionChange?: (value: string) => void,
    isVertical?: boolean,
    name: string,
}

export default function ToggleGroup(props: ToggleGroupProps) {
    function onSelectionChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (props.onSelectionChange) {
            props.onSelectionChange(e.target.value);
        }
    }

    return (
        <ul className={`toggle-group ${props.isVertical ? 'vertical-group' : 'horizontal-group'}`}>
            {props.buttonsList.map((element, i) => {
                return (
                    <li key={i} className='toggle-group-item'>
                        <input type='radio' name={props.name} value={element} onChange={onSelectionChange} />
                        <div>{element}</div>
                    </li>
                )
            })
            }
        </ul>
    )
}
