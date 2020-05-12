export class Product {
  constructor(
    public LotId?: number,
    public LotName?: string,
    public  Picture?:string,
    public StartPrice?:number,
    public  BuyOutPrice?: number,
    public  Info?:string,
    public LotCategory?:string
    ) { }
}
