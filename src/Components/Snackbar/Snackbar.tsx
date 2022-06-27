import styles from './Snackbar.module.css';
type SnackbarProps = {
    id: string,
}
export default function Snackbar(props: SnackbarProps) {
    return (
        <div className={styles.Snackbar} id={props.id}></div>
    )
}
