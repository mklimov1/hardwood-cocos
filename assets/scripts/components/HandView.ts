import { _decorator, Component, Prefab, instantiate, Node, Vec3 } from 'cc';
import { CardView } from './CardView';
import { CardData } from '../cards/CardData';

const { ccclass, property } = _decorator;

@ccclass('HandView')
export class HandView extends Component {
  @property(Prefab)
  private cardPrefab: Prefab = null!;

  @property
  private cardSpacing: number = 220;

  private _cardNodes: Node[] = [];

  public clear(): void {
    for (const node of this._cardNodes) {
      node.destroy();
    }
    this._cardNodes.length = 0;
  }

  private layout(): void {
    const count = this._cardNodes.length;
    if (count === 0) return;

    // Раскладка по центру: первая карта смещена влево, последняя — вправо
    const totalWidth = (count - 1) * this.cardSpacing;
    const startX = -totalWidth / 2;

    for (let i = 0; i < count; i++) {
      const x = startX + i * this.cardSpacing;
      this._cardNodes[i].setPosition(new Vec3(x, 0, 0));
    }
  }

  public setCards(cards: readonly CardData[], playable?: readonly boolean[]): void {
    this.clear();

    for (let i = 0; i < cards.length; i++) {
      const cardNode = instantiate(this.cardPrefab);
      cardNode.setParent(this.node);
      const view = cardNode.getComponent(CardView)!;
      view.setData(cards[i]);
      if (playable) view.setPlayable(playable[i]);
      this._cardNodes.push(cardNode);
    }

    this.layout();
  }

  public updatePlayability(playable: readonly boolean[]): void {
    for (let i = 0; i < this._cardNodes.length && i < playable.length; i++) {
      this._cardNodes[i].getComponent(CardView)!.setPlayable(playable[i]);
    }
  }
}
