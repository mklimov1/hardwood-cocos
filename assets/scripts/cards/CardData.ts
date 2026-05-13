export type CardType = 'attack' | 'defense' | 'tactic';

type LimitPeriod = 'perQuarter';

type Limit = Record<LimitPeriod, number>;

interface Effect {
  trigger: string;
  score?: number;
  drawCards?: number;
  cancelOpponentAttack?: boolean;
  gainMomentum?: number;
  condition?: Record<string, string>;
  opponentScore?: number;
  preventOpponentDefense?: boolean;
  discardHand?: boolean;
  limit?: Limit;
}

export interface CardData {
  id: string;
  name: string;
  type: CardType;
  cost: number;
  description: string;
  effects?: Effect[];
  interactions?: Record<string, string[]>;
}

export interface CardSet {
  cards: CardData[];
}
