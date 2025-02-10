export interface Pokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
    types: {
      type: {
        name: string;
      };
    }[];
    sprites: {
      other: {
        'official-artwork': {
          front_default: string;
        };
      };
    };
  }