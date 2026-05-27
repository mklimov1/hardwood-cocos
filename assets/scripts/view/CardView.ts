import { _decorator, Component, Label } from 'cc';
import { CardData } from './../card/types';
const { ccclass, property } = _decorator;

@ccclass('CardView')
export class CardView extends Component {
  @property(Label)
  nameLabel: Label = null!;

  @property(Label)
  costLabel: Label = null!;

  @property(Label)
  descriptionLabel: Label = null!;

  @property(Label)
  typeLabel: Label = null!;

  render(def: CardData): void {
    this.nameLabel.string = def.name;
    this.costLabel.string = String(def.cost);
    this.descriptionLabel.string = def.description;
    this.typeLabel.string = def.type;
  }
}
