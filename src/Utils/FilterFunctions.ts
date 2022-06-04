export function filterFunctionPosts(object: any) {
    return `${object.title}`;
}

export function filterFunctionUserAddress(object: any) {
    return `${object.address.street} ${object.address.suite} ${object.address.city}`;
}

export function filterFunctionPhotos(object: any) {
    return `${object.title}`;
}

export function filterFunctionTags(object: any) {
    return `${object}`;
}

