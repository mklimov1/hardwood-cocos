import { _decorator, Component, resources, JsonAsset } from 'cc';
import { CardData } from './CardData';

const { ccclass } = _decorator;

@ccclass('CardDatabase')
export class CardDatabase extends Component {
  static _cards: Map<string, CardData> = new Map();

  public static loadAll(): Promise<void> {
    return new Promise((resolve, reject) => {
      resources.loadDir('cards', JsonAsset, (err, assets) => {
        if (err) {
          reject(err);
          return;
        }
        assets.forEach((asset) => {
          const card = asset.json as CardData;
          this._cards.set(card.id, card);
        });
        resolve();
      });
    });
  }

  public static get(id: string): CardData | undefined {
    return CardDatabase._cards.get(id);
  }

  public static all(): CardData[] {
    return Array.from(CardDatabase._cards.values());
  }
}
