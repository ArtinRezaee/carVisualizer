import { Model } from './model';

export interface Manufacturer {
    name: string,
    headquarters: string,
    desc: string,
    models: Model[]
}
