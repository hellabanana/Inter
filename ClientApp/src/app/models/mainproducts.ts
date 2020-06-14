export class Product {
  constructor(
    public lotId: number,
    public Name?: string,
    public  FileID?:string,
    public startPrice?:number,
    public  buyOutPrice?: number,
    public  info?:string,
    public lotCategory?: string,
    public owner?: string,
    public buyer?: string,
    public dateEnd?: Date,
    public dateStart?: Date,
    public state?: string

    ) { }
}
