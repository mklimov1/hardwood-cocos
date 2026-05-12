export enum CardType {
  Attack = 'Attack',
  Defense = 'Defense',
  Tactic = 'Tactic',
}

export interface CardData {
  id: string;
  name: string;
  type: CardType;
  cost: number;
  description: string;
}
