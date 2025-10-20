
export type serviceDataType = {
    accomodation: string,
    description: string,
    hostname: string,
    id: number,
    isfavorite: boolean,
    placelocation: string,
    placename: string,
    price: string,
    services: string[],
    servicetype: string,
    subdescription: string,
}
export type userSignUpType = {
    username: string,
    password: string,
    serviceType: string,
    email: string,
    telephone: string
}
export type userLoginType = {
    username: string,
    password: string
}
export type newServiceType = {
    hostname: string,
    serviceType: string,
    accomodation: string,
    placename: string,
    placeLocation: string,
    subDescription: string,
    description: string
    services: string[],
    price: number,
    isFavorite: boolean
}