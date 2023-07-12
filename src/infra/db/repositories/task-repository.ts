import { Create, Delete, FindAll, Task, Update } from 'src/domain'
import { MongoHelper } from '../helper-connection'
import { ObjectId } from 'mongodb'
export class TaskRepository
implements Create<Task>, FindAll<Task>, Update<Task>, Delete {
  async create (task: Partial<Task>): Promise<any> {
    task.created_at = new Date()
    return await MongoHelper.getCollection('task').insertOne(task)
  }

  async findAll (id: string): Promise<any> {
    return await MongoHelper.getCollection('task')
      .find({ userId: id })
      .toArray()
  }

  async update (task: Partial<Task>): Promise<any> {
    const id = new ObjectId(task._id)
    delete task._id
    task.updated_at = new Date()
    return await MongoHelper.getCollection('task').findOneAndUpdate(
      { _id: id },
      { $set: task }
    )
  }

  async delete (id: any): Promise<any> {
    const _id = new ObjectId(id)
    return await MongoHelper.getCollection('task').deleteOne({ _id })
  }
}
