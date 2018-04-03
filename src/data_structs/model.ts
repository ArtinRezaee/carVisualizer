import { Color } from './color';
import { Trim } from './trim';

export interface Model {
    id: string,
    name: string,
    desc: string,
    year: string,
    colors: Color[],
    trims: Trim[]
}
