import { MongoHelper } from '../helper-connection'
import { UserRepository } from './user-repository'

const DB_USER = 'iugorsette'
const DB_PASSWORD = 'mongodbpassdefault'
const DB_HOST = 'localhost'

describe('UserRepository', () => {
  let userRepository: UserRepository

  beforeAll(async () => {
    await MongoHelper.connect(`mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}`, 'test')
  })

  afterAll(async () => {
    await MongoHelper.getCollection('users').deleteMany({})
    await MongoHelper.disconnect()
  })

  beforeEach(() => {
    userRepository = new UserRepository()
  })

  describe('create', () => {
    it('should create a new user and return the created user', async () => {
      const userData = {
        name: 'Iugor Sette',
        email: 'iugorsette@example.com',
        password: 'password',
        confirmPassword: 'password'
      }

      const createdUser = await userRepository.create(userData)

      expect(createdUser).toBeDefined()
      expect(createdUser.name).toBe(userData.name)
      expect(createdUser.email).toBe(userData.email)
    })
  })

  describe('findOne', () => {
    it('should find a user by email', async () => {
      const userData = {
        name: 'Iugor Sette',
        email: 'iugorsette@example.com',
        password: 'password',
        confirmPassword: 'password'
      }

      await userRepository.create(userData)

      const foundUser = await userRepository.findOne({ email: userData.email })

      expect(foundUser).toBeDefined()
      expect(foundUser.name).toBe(userData.name)
      expect(foundUser.email).toBe(userData.email)
    })

    it('should return null if no user is found', async () => {
      const nonExistentEmail = 'nonexistent@example.com'

      const foundUser = await userRepository.findOne({
        email: nonExistentEmail
      })

      expect(foundUser).toBeNull()
    })
  })
})
