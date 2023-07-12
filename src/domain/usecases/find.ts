export interface Find<T> {
  find: () => Promise<T[]>
}
export interface FindOne<T> {
  findOne: (data: T) => Promise<T>
}
export interface FindAll<T> {
  findAll: (id: string) => Promise<T[]>
}
