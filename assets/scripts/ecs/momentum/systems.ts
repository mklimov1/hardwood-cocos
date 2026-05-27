import { World } from '@/scripts/core/World.ts';
import { Momentum, MomentumData } from './momentum.ts';

export function momentumRegenSystem(world: World, amount: number): void {
  world.query(Momentum).forEach((e) => {
    const m = world.get<MomentumData>(e, Momentum);
    m.value = Math.min(m.max, m.value + amount);
  });
}
