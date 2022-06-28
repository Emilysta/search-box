export function convertPosts(post: Post) {
    return `${post.title}`;
}

export function convertUserAddress(user: User) {
    return `${user.address.street} ${user.address.suite} ${user.address.city}`;
}

export function convertPhotos(photo: Photo) {
    return `${photo.title}`;
}

export function convertTags(tag: string) {
    return `${tag}`;
}

export type Photo = {
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUtl: string,
}

export type Post = {
    userId: number,
    id: number,
    title: string,
    body: string,
}

export type User = {
    id: number,
    name: string,
    username: string,
    email: string,
    address: {
        street: string,
        suite: string,
        city: string,
        zipcode: string,
        geo: {
            lat: string,
            lng: string,
        }
    },
    phone: string,
    website: string,
    company: {
        name: string,
        catchPhrase: string,
        bs: string,
    }
}