async function getPlaceholderData(endOfUrl: string) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/${endOfUrl}`);
    return response;
}

export { getPlaceholderData };

