export interface Delete {
  delete: (id: string) => Promise<boolean>
}
