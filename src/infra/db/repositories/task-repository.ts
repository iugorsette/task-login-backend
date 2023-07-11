import { Create, Find, Task, User } from 'src/domain'
import { MongoHelper } from '../helper-connection'

export class TaskRepository implements Create<Task>, Find<Task> {
  async create (task: Partial<Task>): Promise<any> {
    console.log('task:', task)
    return await MongoHelper.getCollection('task').insertOne(task)
  }

  async find (user: User): Promise<any> {
    return await MongoHelper.getCollection('users').aggregate([
      {
        $lookup: {
          from: 'task',
          localField: '_id',
          foreignField: 'userId',
          as: 'tasks'
        }
      },
      { $match: { _id: user._id } }
    ])
  }
}
