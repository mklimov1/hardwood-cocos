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
import { Hand } from './systems/hand';
import { Match } from './systems/match';
import { CardData, CardType } from './data/card';

const { ccclass, property } = _decorator;

@ccclass('MatchScene')
export class MatchScene extends Component {
  @property(Prefab)
  private handPrefab: Prefab = null!;

  @property(MatchHud)
  private hud: MatchHud = null!;

  private _hand: Hand = new Hand();
  private _match: Match = new Match(3);
  private _handView: HandView | null = null;

  start() {
    const starting: CardData[] = [
      { id: 'jumpshot', name: 'Jump Shot', type: CardType.Attack, cost: 1, description: 'Deal 4.' },
      {
        id: 'pick_and_roll',
        name: 'Pick and Roll',
        type: CardType.Attack,
        cost: 2,
        description: 'Deal 6.',
      },
      {
        id: 'zone_d',
        name: 'Zone Defense',
        type: CardType.Defense,
        cost: 2,
        description: 'Block 5.',
      },
      { id: 'box_out', name: 'Box Out', type: CardType.Defense, cost: 1, description: 'Block 3.' },
      {
        id: 'alley_oop',
        name: 'Alley-Oop',
        type: CardType.Attack,
        cost: 4,
        description: 'Deal 12.',
      },
    ];

    for (const card of starting) this._hand.add(card);

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
    this.hud.setMomentum(this._match.momentum, this._match.maxMomentum);
  }
}
