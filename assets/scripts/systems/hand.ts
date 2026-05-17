import { CardData } from '../cards/CardData';

export class Hand {
  private readonly _cards: CardData[] = [];
  private readonly _maxSize: number;

  constructor(maxSize: number = 7) {
    this._maxSize = maxSize;
  }

  public get cards(): readonly CardData[] {
    return this._cards;
  }

  public get size(): number {
    return this._cards.length;
  }

  public get isFull(): boolean {
    return this._cards.length >= this._maxSize;
  }

  public add(...cards: CardData[]): boolean {
    if (this.isFull) return false;
    this._cards.push(...cards);
    return true;
  }

  public removeAt(index: number): CardData | null {
    if (index < 0 || index >= this._cards.length) return null;
    return this._cards.splice(index, 1)[0];
  }

  public removeById(id: string): CardData | null {
    const index = this._cards.findIndex((c) => c.id === id);
    return index >= 0 ? this.removeAt(index) : null;
  }
}
