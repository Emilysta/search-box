async function getPlaceholderData(endOfUrl: string) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/${endOfUrl}`);
    if (!response.ok)
        throw new Error(response.statusText);

    const responseJSON = await response.json();
    return responseJSON;
}

export { getPlaceholderData };

