export interface ICardItemData {
  name: string;
  price: number;
  description?: string;
  images?: [
    {
      image?: string;
    }
  ];
  modifiers?: [
    {
      name: string;
      items: [
        {
          name: string;
          price: number;
          maxChoices: number;
        }
      ];
      maxChoices: number;
    }
  ];
  basket?: [
    {
      name: string;
      total: number;
      numberToOrder: number;
      modifiers?: {
        name?: string;
        price?: number;
      };
    }
  ];
}
