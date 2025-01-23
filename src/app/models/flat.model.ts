export interface Flat {
  city: string;
  streetname: string;
  streetnumber: number;
  areasize: number;
  hasAC: boolean;
  yearbuilt: number;
  rentprice: number;
  dateavailable: Date;
  isFavorite?: boolean;
  comments?: string[];
  rating?: number;
}
