import styles from './KeyInfo.module.css';

type KeyInfoProps = {
    keyText: string,
    info: string,
}

export default function KeyInfo(props: KeyInfoProps) {
    return (
        <div className={styles.key_info_box}>
            <div className={styles.key_info_key}>
                {props.keyText}
            </div>
            {props.info}
        </div>
    )
}
