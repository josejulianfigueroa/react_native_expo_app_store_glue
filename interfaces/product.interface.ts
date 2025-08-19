
export interface CartProduct {
  id: string;
  slug: string;
  title: string;
  price: number;
  quantity: number;
  size: Size;
  image: string;
}


export type Size = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';
 