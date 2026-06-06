import { _decorator, Component, Layout, Prefab, instantiate, CCBoolean } from 'cc';
import { Entity, World } from 'db://assets/scripts/core/World';
import { Card, CardRef } from 'db://assets/scripts/ecs/card';
import { CardDatabase } from 'db://assets/scripts/card/CardDatabase';
import { CardView } from 'db://assets/scripts/view/CardView.ts';
import { DraggableNode } from 'db://assets/scripts/view/DraggableNode.ts';
const { ccclass, property } = _decorator;

@ccclass('HandView')
export class HandView extends Component {
  @property(Prefab)
  cardPrefab: Prefab = null;

  @property(CCBoolean)
  draggable = false;

  private layout: Layout = null;

  onLoad() {
    this.layout = this.getComponentInChildren(Layout);
  }

  private spawnCard(world: World, defId: string): Entity {
    const def = CardDatabase.get(defId);
    if (!def) {
      console.warn('нет такой карты в базе:', defId);
      return -1;
    }
    const e = world.createEntity();
    world.add<CardRef>(e, Card, { defId });
    return e;
  }

  private renderCard(world: World, entity: number): void {
    const defId = world.get<CardRef>(entity, Card)!.defId;
    const def = CardDatabase.get(defId);
    if (!def) return;

    const cardNode = instantiate(this.cardPrefab);
    cardNode.getComponent(CardView)!.render(def);
    if (this.draggable) {
      cardNode.addComponent(DraggableNode);
    }
    this.layout.node.addChild(cardNode);
  }

  public dealHand(world: World, defIds: string[]): void {
    for (const defId of defIds) {
      const e = this.spawnCard(world, defId);
      if (e >= 0) this.renderCard(world, e);
    }
  }
}
