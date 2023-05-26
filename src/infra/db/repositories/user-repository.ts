import { Create, FindOne, User } from 'src/domain'
import { MongoHelper } from '../helper-connection'

export class UserRepoisitory implements Create<User>, FindOne<User> {
  async create (data: User): Promise<any> {
    await MongoHelper.getCollection('users').insertOne(data)
    const email = data.email
    return await MongoHelper.getCollection('users').findOne({ email })
  }

  async findOne ({ email }: User): Promise<any> {
    return await MongoHelper.getCollection('users').findOne({ email })
  }
}
