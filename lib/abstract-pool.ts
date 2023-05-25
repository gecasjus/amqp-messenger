import {
  Pool as GenericPool,
  Options,
  Factory,
  createPool,
} from "generic-pool";

export abstract class Pool<T> {
  protected abstract opts: Options;
  private pool: GenericPool<T>;

  protected fetch(factory: Factory<T>) {
    this.pool = createPool(factory, this.opts);

    return this.pool;
  }

  protected getResource(priority?: number): Promise<T> {
    return this.pool.acquire(priority);
  }

  protected useResource(onFulfilled: (resource: T) => void, priority?: number) {
    return this.getResource(priority).then(onFulfilled);
  }
}
