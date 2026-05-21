import { CardPile } from './../systems/сardPile.ts';
import { CardData } from './../cards/CardData.ts';
import { shuffle } from 'lodash-es';

export class PlayerState {
  private readonly _hand: CardPile;
  private readonly _deck: CardPile;
  private readonly _discard: CardPile;

  private readonly HAND_MAX_SIZE: number = 10;
  private readonly HAND_START_SIZE: number = 5;
  score: number = 0;
  momentum: number = 0;

  constructor(startingDeck: CardData[]) {
    this._discard = new CardPile([]);
    this._deck = new CardPile(shuffle(startingDeck));
    this._hand = new CardPile([]);

    this.drawTo(this.HAND_START_SIZE);
  }

  get hand() {
    return this._hand.cards;
  }

  get deck() {
    return this._deck.cards;
  }

  get discard() {
    return this._discard.cards;
  }

  drawTo(target: number): void {
    const space = this.HAND_MAX_SIZE - this._hand.size;
    const needed = target - this._hand.size;
    const count = Math.min(needed, space, this._deck.size);
    if (count <= 0) return;

    const drawn = this._deck.removeFirst(count);
    this._hand.add(...drawn);
  }

  throwCard(index: number) {
    const card = this._hand.removeAt(index);
    this._discard.add(card);
  }
}
