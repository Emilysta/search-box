export function useSnackbar(id: string) {
    const myElement = document.getElementById(id);

    const showSnackbar = (text: string) => {
        if (myElement !== null)
            myElement.innerText = text;

        if (text !== '') {
            myElement?.classList.toggle('show');
            setTimeout(() => {
                myElement?.classList.toggle('show');
            }, 2800);
        }
    }
    return [showSnackbar] as const;
}