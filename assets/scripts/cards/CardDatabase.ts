import { _decorator, Component, resources, JsonAsset } from 'cc';
import { CardData, CardSet } from './CardData';

const { ccclass } = _decorator;

@ccclass('CardDatabase')
export class CardDatabase extends Component {
  private static _instance: CardDatabase | null = null;
  private _cards: Map<string, CardData> = new Map();

  public static get instance(): CardDatabase | null {
    return CardDatabase._instance;
  }

  onLoad() {
    CardDatabase._instance = this;
  }

  onDestroy() {
    if (CardDatabase._instance === this) CardDatabase._instance = null;
  }

  public loadAll(): Promise<void> {
    return new Promise((resolve, reject) => {
      resources.loadDir('cards', JsonAsset, (err, assets) => {
        if (err) {
          reject(err);
          return;
        }
        for (const asset of assets) {
          const set = asset.json as CardSet;
          for (const card of set.cards) {
            this._cards.set(card.id, card);
          }
        }
        resolve();
      });
    });
  }

  public get(id: string): CardData | undefined {
    return this._cards.get(id);
  }

  public all(): CardData[] {
    return Array.from(this._cards.values());
  }
}
