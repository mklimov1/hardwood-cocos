import { _decorator, Component, Prefab, instantiate, Vec3 } from 'cc';
import { HandView } from './components/HandView';
import { MatchHud } from './components/MatchHud';
import { Match } from './systems/match';
import { CardDatabase } from './cards/CardDatabase.ts';
import { PlayerState } from './systems/playerState.ts';
import { HandInteraction } from './systems/HandInteraction.ts';

const { ccclass, property } = _decorator;

@ccclass('MatchScene')
export class MatchScene extends Component {
  @property(Prefab)
  private handPrefab: Prefab = null!;

  @property(MatchHud)
  private hud: MatchHud = null!;

  private _match: Match = new Match(3);
  private _handView: HandView | null = null;
  private playerState: PlayerState;

  private _interaction = new HandInteraction((index) => this.playCard(index));

  async start() {
    await this.load();
    this.playerState = new PlayerState(CardDatabase.all());

    const handNode = instantiate(this.handPrefab);
    handNode.setParent(this.node);
    handNode.setPosition(new Vec3(0, -300, 0));
    this._handView = handNode.getComponent(HandView);

    this.refresh();
  }

  private playCard(index: number): void {
    this.playerState.throwCard(index);
    this.refresh();
  }

  private refresh(): void {
    if (!this._handView) return;
    const playable = this.playerState.hand.map((c) => this._match.canPlay(c));
    this._handView.updatePlayability(playable);
    this._handView.setCards(this.playerState.hand, playable);
    this.hud.setMomentum(this._match.momentum, this._match.maxMomentum);
    this._interaction.attach(this._handView.nodes);
  }

  onDestroy() {
    this._interaction.detach();
  }

  private async load() {
    await CardDatabase.loadAll();
  }
}
