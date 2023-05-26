import { MongoClient, Collection } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  uri: null as string,
  database: '' as string,

  async connect (uri: string, dbName: string): Promise<void> {
    try {
      this.uri = uri
      this.database = dbName
      this.client = await MongoClient.connect(uri)
      console.log('Banco conectado')
    } catch (error) {
      throw new Error(`Não foi possivel conectar ao banco de dados, erro: ${error.message}`)
    }
  },

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  },

  getCollection (name: string): Collection {
    return this.client.db(this.database).collection(name)
  }
}
