import './KeyInfo.css';

type KeyInfoProps = {
    keyText: string,
    info: string,
}

export default function KeyInfo(props: KeyInfoProps) {
    return (
        <div className="key-info-box">
            <div className='key'>
                {props.keyText}
            </div>
            {props.info}
        </div>
    )
}
