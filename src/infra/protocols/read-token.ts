export interface ReadToken {
  readToken: (token: string) => Check
}

interface Check {
  name: string
  id: string
}
