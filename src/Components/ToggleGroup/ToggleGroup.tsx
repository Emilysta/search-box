import styles from './ToggleGroup.module.css';

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
        <ul className={`${styles.toggle_group} ${props.isVertical ? styles.vertical_group : styles.horizontal_group}`}>
            {props.buttonsList.map((element, i) => {
                return (
                    <li key={i} className={styles.toggle_group_item}>
                        <input type='radio' name={props.name} value={element} onChange={onSelectionChange} />
                        <p>{element}</p>
                    </li>
                )
            })
            }
        </ul>
    )
}
