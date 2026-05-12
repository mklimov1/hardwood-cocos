import { _decorator, Component, Label } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('MatchHud')
export class MatchHud extends Component {
  @property(Label)
  private momentumLabel: Label = null!;

  public setMomentum(current: number, max: number): void {
    this.momentumLabel.string = `Momentum: ${current} / ${max}`;
  }
}
