export type Entity = number;

export class World {
  private stores = new Map<string, Map<Entity, unknown>>();

  private nextId: number = 0;

  private entities = new Set<Entity>();

  createEntity(): Entity {
    const e = this.nextId++;
    this.entities.add(e);
    return e;
  }

  query(...types: string[]): Entity[] {
    return [...this.entities].filter((e) => types.every((t) => this.has(e, t)));
  }

  add<T>(e: Entity, type: string, data: T): void {
    let store = this.stores.get(type);
    if (!store) this.stores.set(type, (store = new Map()));
    store.set(e, data);
  }

  get<T>(e: Entity, type: string): T | undefined {
    return this.stores.get(type)?.get(e) as T | undefined;
  }

  has(e: Entity, type: string): boolean {
    return this.stores.get(type)?.has(e) ?? false;
  }
}
