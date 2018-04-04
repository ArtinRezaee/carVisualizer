export interface Trim {
    id: string,
    name: string,
    price: number,
}

export interface Color {
    id: string,
    name: string,
    price: number,
    src: string,
    type: string
}

export interface Model {
    id: string,
    name: string,
    desc: string,
    year: string,
    colors: Color[],
    trims: Trim[]
}

export interface Manufacturer {
    name: string,
    headquarters: string,
    desc: string,
    models: Model[]
}

export interface Design {
    id?: string,
    email?: string,
    manufacturer: string,
    model: string,
    trim: string,
    customization: {
        ext: Color,
        int: Color
    },
    price: number
}

export interface User {
    userID: string,
    email: string,
    name: string,
    phone: string,
    
    access: number,
    createdOn: number
}

export interface Dealerships {
    phone: string,
    address: string,
    name: string,
    src: string,
    srcAdd: string
}
