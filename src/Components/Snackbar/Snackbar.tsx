import './Snackbar.css';
type SnackbarProps = {
    id: string,
}
export default function Snackbar(props: SnackbarProps) {
    return (
        <div className='snackbar' id={props.id}></div>
    )
}
