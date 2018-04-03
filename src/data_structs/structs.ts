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