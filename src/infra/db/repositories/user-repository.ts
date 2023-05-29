import { Create, FindOne, User } from 'src/domain'
import { MongoHelper } from '../helper-connection'
import { ObjectId } from 'mongodb'
export class UserRepository implements Create<User>, FindOne<User> {
  async create (data: User): Promise<any> {
    const { confirmPassword, ...user } = { ...data, _id: new ObjectId() }
    await MongoHelper.getCollection('users').insertOne(user)
    const foundUser = await MongoHelper.getCollection('users').findOne({ email: data.email })
    return foundUser
  }

  async findOne ({ email }: User): Promise<any> {
    return await MongoHelper.getCollection('users').findOne({ email })
  }
}
