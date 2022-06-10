import { useState } from "react";

export function useSnackbar(id: string) {
    const myElement = document.getElementById(id);
    const [visible, setVisible] = useState(false);

    const showSnackbar = (text: string) => {
        if (myElement !== null)
            myElement.innerText = text;

        if (text !== '' && !visible) {
            myElement?.classList.toggle('show');
            setVisible(true);
            setTimeout(() => {
                myElement?.classList.toggle('show');
                setVisible(false);
            }, 2800);
        }
    }
    return [showSnackbar] as const;
}