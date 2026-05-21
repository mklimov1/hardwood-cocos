import { Node, Vec3, EventTouch } from 'cc';

const LIFT_Y = 100;
const REST_Y = 0;

export class HandInteraction {
  private _nodes: Node[] = [];
  private _targetIndex = -1;
  private readonly _tmp = new Vec3();

  constructor(private readonly onPlay: (index: number) => void) {}

  attach(nodes: Node[]): void {
    this.detach();
    this._nodes = nodes;
    nodes.forEach((node, index) => {
      node.on(Node.EventType.TOUCH_START, () => this.onStart(index), this);
      node.on(Node.EventType.TOUCH_MOVE, (e: EventTouch) => this.onMove(index, e), this);
      node.on(Node.EventType.TOUCH_END, () => this.onEnd(index), this);
      node.on(Node.EventType.MOUSE_ENTER, () => this.onEnter(index), this);
      node.on(Node.EventType.MOUSE_LEAVE, () => this.onLeave(index), this);
    });
  }

  detach(): void {
    this._nodes.forEach((node) => node.targetOff(this));
    this._nodes = [];
    this._targetIndex = -1;
  }

  private onEnter(index: number): void {
    if (this._targetIndex >= 0) return;
    const node = this._nodes[index];
    node.setPosition(node.position.x, LIFT_Y, node.position.z);
  }

  private onLeave(index: number): void {
    if (this._targetIndex >= 0) return;
    const node = this._nodes[index];
    node.setPosition(node.position.x, REST_Y, node.position.z);
  }

  private onStart(index: number): void {
    if (this._targetIndex >= 0) return;
    this._targetIndex = index;
  }

  private onMove(index: number, event: EventTouch): void {
    if (this._targetIndex !== index) return;
    const node = this._nodes[index];
    const ui = event.getUILocation();
    node.parent.inverseTransformPoint(this._tmp, this._tmp.set(ui.x, ui.y, 0));
    node.setPosition(this._tmp.x, this._tmp.y, 0);
  }

  private onEnd(index: number): void {
    if (this._targetIndex !== index) return;
    this._targetIndex = -1;
    this.onPlay(index);
  }
}
