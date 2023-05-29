export interface ComparePassword {
  compare: (enteredPassword: string, password: string) => Promise<boolean>
}
