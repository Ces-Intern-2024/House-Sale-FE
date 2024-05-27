export type RawMarker = [string, number, number, number]
export interface IMarker  {
    key:string,
    name: string,
    lat:number,
    lng:number,
    propertyId: number,
}
