export interface Update<T> {
  update: (newData: T) => Promise<T>
}
