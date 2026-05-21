import { CardData } from '@/scripts/cards/CardData.ts';

export class CardPile {
  private readonly _cards: CardData[] = [];

  constructor(cards: CardData[] = []) {
    this._cards = [...cards];
  }

  public get cards(): CardData[] {
    return this._cards;
  }

  public get size(): number {
    return this._cards.length;
  }

  public add(...cards: CardData[]) {
    this._cards.push(...cards);
  }

  public removeAt(index: number): CardData | null {
    if (index < 0 || index >= this._cards.length) return null;
    return this._cards.splice(index, 1)[0];
  }

  public removeById(id: string): CardData | null {
    const index = this._cards.findIndex((c) => c.id === id);
    return index >= 0 ? this.removeAt(index) : null;
  }

  public removeFirst(count: number): CardData[] {
    return this._cards.splice(0, Math.max(0, count));
  }
}
