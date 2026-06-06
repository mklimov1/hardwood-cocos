import { _decorator, Component, Label, Prefab, Node } from 'cc';
import { Entity, World } from './core/World';
import { Side, SideData } from './ecs/side';
import { Momentum, MomentumData, momentumRegenSystem } from './ecs/momentum';
import { CardDatabase } from './card/CardDatabase';
import { HandView } from 'db://assets/scripts/view/HandView.ts';
const { ccclass, property } = _decorator;

@ccclass('MatchManager')
export class MatchManager extends Component {
  @property(Label)
  private momentumLabel: Label = null!;

  @property(Prefab)
  private cardPrefab: Prefab = null!;

  @property(HandView)
  private playerHand: HandView;

  @property(HandView)
  private enemyHand: HandView;

  @property(Node)
  private cardDropZone: Node;

  private world: World;

  private player: Entity;

  private enemy: Entity;

  private init() {
    this.world = new World();

    this.player = this.world.createEntity();
    this.world.add<SideData>(this.player, Side, { name: 'player' });
    this.world.add<MomentumData>(this.player, Momentum, { value: 0, max: 10 });

    this.enemy = this.world.createEntity();
    this.world.add<SideData>(this.enemy, Side, { name: 'enemy' });
    this.world.add<MomentumData>(this.enemy, Momentum, { value: 0, max: 10 });
  }

  private async load() {
    await CardDatabase.loadAll();
  }

  private create() {
    this.enemyHand.dealHand(this.world, [
      'alley_oop',
      'pick_and_roll',
      'zone_defense',
      'fast_break',
      'jump_shot',
    ]);
    this.playerHand.dealHand(this.world, [
      'alley_oop',
      'pick_and_roll',
      'zone_defense',
      'fast_break',
      'jump_shot',
    ]);
  }

  async start() {
    this.init();
    await this.load();
    this.create();
    this.syncView();
  }

  private syncView(): void {
    const m = this.world.get<MomentumData>(this.player, Momentum)!;
    this.momentumLabel.string = `Момент: ${m.value} / ${m.max}`;
  }

  nextQuarter(): void {
    momentumRegenSystem(this.world, 3);
    this.syncView();
  }
}
