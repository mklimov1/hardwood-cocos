import { _decorator, Component, Node, EventTouch, Vec3 } from 'cc';
const { ccclass } = _decorator;

@ccclass('DraggableNode')
export class DraggableNode extends Component {
  private startPos = new Vec3();
  private currentPos = new Vec3();
  private grabbed = false;

  private initIndex = -1;

  start() {
    this.onEnable();
  }

  onDestroy() {
    this.onDisable();
  }

  onEnable() {
    this.node.on(Node.EventType.TOUCH_START, this.handleStart);
    this.node.on(Node.EventType.TOUCH_MOVE, this.handleMove);
    this.node.on(Node.EventType.TOUCH_END, this.handleEnd);
    this.node.on(Node.EventType.TOUCH_CANCEL, this.handleEnd);
  }

  onDisable() {
    this.node.off(Node.EventType.TOUCH_START, this.handleStart);
    this.node.off(Node.EventType.TOUCH_MOVE, this.handleMove);
    this.node.off(Node.EventType.TOUCH_END, this.handleEnd);
    this.node.off(Node.EventType.TOUCH_CANCEL, this.handleEnd);
  }

  resetPosition(): void {
    this.node.setPosition(this.startPos);
  }

  private handleStart = (_e: EventTouch) => {
    if (this.grabbed) return;
    this.grabbed = true;
    this.startPos.set(this.node.position);
    this.currentPos.set(this.node.position);
    this.initIndex = this.node.getSiblingIndex();
    this.node.setSiblingIndex(-1);
    this.resetPosition();
  };

  private handleMove = (e: EventTouch) => {
    if (!this.grabbed) return;
    const d = e.getUIDelta();
    const prevPos = this.currentPos;
    this.currentPos.set(prevPos.x + d.x, prevPos.y + d.y, this.startPos.z);
    this.node.setPosition(this.currentPos);
  };

  private handleEnd = (_e: EventTouch) => {
    if (!this.grabbed) return;
    this.grabbed = false;
    this.node.setSiblingIndex(this.initIndex);
    this.resetPosition();
  };
}
