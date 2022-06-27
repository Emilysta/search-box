export function convertPosts(object: any) {
    return `${object.title}`;
}

export function convertUserAddress(object: any) {
    return `${object.address.street} ${object.address.suite} ${object.address.city}`;
}

export function convertPhotos(object: any) {
    return `${object.title}`;
}

export function convertTags(object: any) {
    return `${object}`;
}

