import { CardData } from '../cards/CardData';

export class Match {
  private _momentum: number;
  private _maxMomentum: number;

  constructor(initialMomentum: number = 3) {
    this._momentum = initialMomentum;
    this._maxMomentum = initialMomentum;
  }

  public get momentum(): number {
    return this._momentum;
  }

  public get maxMomentum(): number {
    return this._maxMomentum;
  }

  public canPlay(card: CardData): boolean {
    return card.cost <= this._momentum;
  }

  public play(card: CardData): boolean {
    if (!this.canPlay(card)) return false;
    this._momentum -= card.cost;
    return true;
  }

  public spend(amount: number): boolean {
    if (amount < 0 || amount > this._momentum) return false;
    this._momentum -= amount;
    return true;
  }
}
