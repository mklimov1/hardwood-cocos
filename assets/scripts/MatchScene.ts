import {
  _decorator,
  Component,
  Prefab,
  instantiate,
  Vec3,
  input,
  Input,
  KeyCode,
  EventKeyboard,
} from 'cc';
import { HandView } from './components/HandView';
import { MatchHud } from './components/MatchHud';
import { Match } from './systems/match';
import { CardDatabase } from 'db://assets/scripts/cards/CardDatabase.ts';
import { CardPile } from 'db://assets/scripts/systems/сardPile.ts';

const { ccclass, property } = _decorator;

@ccclass('MatchScene')
export class MatchScene extends Component {
  @property(Prefab)
  private handPrefab: Prefab = null!;

  @property(MatchHud)
  private hud: MatchHud = null!;

  private _hand: CardPile = new CardPile([], 10);
  private _match: Match = new Match(3);
  private _handView: HandView | null = null;

  async start() {
    await this.load();
    const cards = CardDatabase.all();
    const starting = cards.slice(0, 5);

    this._hand.add(...starting);

    const handNode = instantiate(this.handPrefab);
    handNode.setParent(this.node);
    handNode.setPosition(new Vec3(0, -300, 0));
    this._handView = handNode.getComponent(HandView);

    this.refresh();

    // Временно для проверки реактивности — удалим на следующем шаге
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
  }

  onDestroy() {
    input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
  }

  private async load() {
    await CardDatabase.loadAll();
  }

  private onKeyDown(event: EventKeyboard) {
    if (event.keyCode === KeyCode.SPACE) {
      this._match.spend(1);
      this.refresh();
    }
  }

  private refresh(): void {
    if (!this._handView) return;
    const playable = this._hand.cards.map((c) => this._match.canPlay(c));
    this._handView.updatePlayability(playable);
    this._handView.setCards(this._hand.cards, playable);
    this.hud.setMomentum(this._match.momentum, this._match.maxMomentum);
  }
}
