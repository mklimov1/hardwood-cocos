import { _decorator, Component, Label, Sprite, Color, UIOpacity } from 'cc';
import { CardData, CardType } from '../data/card';

const { ccclass, property } = _decorator;

@ccclass('CardView')
export class CardView extends Component {
  @property(Label)
  private nameLabel: Label = null!;

  @property(Label)
  private costLabel: Label = null!;

  @property(Label)
  private typeLabel: Label = null!;

  @property(Label)
  private descriptionLabel: Label = null!;

  @property(Sprite)
  private background: Sprite = null!;

  private _data: CardData | null = null;

  public setData(data: CardData): void {
    this._data = data;
    this.nameLabel.string = data.name;
    this.costLabel.string = String(data.cost);
    this.typeLabel.string = data.type;
    this.descriptionLabel.string = data.description;
    this.background.color = CardView.colorForType(data.type);
  }

  public get data(): CardData | null {
    return this._data;
  }

  private static colorForType(type: CardType): Color {
    switch (type) {
      case CardType.Attack:
        return new Color(200, 70, 60);
      case CardType.Defense:
        return new Color(60, 110, 200);
      case CardType.Tactic:
        return new Color(190, 160, 70);
    }
  }

  public setPlayable(playable: boolean): void {
    let opacity = this.getComponent(UIOpacity);
    if (!opacity) opacity = this.addComponent(UIOpacity);
    opacity.opacity = playable ? 255 : 120;
  }
}
