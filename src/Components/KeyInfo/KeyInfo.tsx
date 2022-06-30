import styles from './KeyInfo.module.css';

type KeyInfoProps = {
    keyText: string,
    info: string,
}

export default function KeyInfo(props: KeyInfoProps) {
    return (
        <div className={styles.keyInfoBox}>
            <div className={styles.keyInfoKey}>
                {props.keyText}
            </div>
            {props.info}
        </div>
    )
}
