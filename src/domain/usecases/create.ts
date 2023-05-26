export interface Create<T> {
  create: (data: T) => Promise<T>
}
