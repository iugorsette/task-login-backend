import { FindOne, User } from './../src/domain'
import { ComparePassword, CreateToken } from './../src/infra'
import { LoginController } from './../src/presentation/controller/login-controller'

describe('LoginController', () => {
  const findUserMock: FindOne<User> = {
    findOne: jest.fn()
  }

  const jwtAdapterMock: CreateToken = {
    createToken: jest.fn()
  }

  const bcryptMock: ComparePassword = {
    compare: jest.fn()
  }

  const mockUser: User = {
    _id: '7',
    name: 'Iugor Sette',
    email: 'iugorsette@example.com',
    password: 'str0ngPassw0rd'
  }

  const mockRequestBody = {
    email: 'iugorsette@example.com',
    password: 'str0ngPassw0rd'
  }

  const mockToken = 'mocked-token'

  let loginController: LoginController

  beforeEach(() => {
    loginController = new LoginController(findUserMock, jwtAdapterMock, bcryptMock)
  })

  it('should return OK response with user name, id, and token', async () => {
    findUserMock.findOne.mockResolvedValueOnce(mockUser)
    jwtAdapterMock.createToken.mockReturnValueOnce(mockToken)
    bcryptMock.compare.mockResolvedValueOnce(true)

    const response = await loginController.handler({ body: mockRequestBody })

    expect(findUserMock.findOne).toHaveBeenCalledWith({ email: mockRequestBody.email })
    expect(jwtAdapterMock.createToken).toHaveBeenCalledWith(mockUser)
    expect(bcryptMock.compare).toHaveBeenCalledWith(mockRequestBody.password, mockUser.password)
    expect(response.status).toBe(200)
    expect(response.data).toEqual({
      name: mockUser.name,
      id: mockUser._id,
      token: mockToken
    })
  })

  it('should return BadRequest response with error message if user is not found', async () => {
    findUserMock.findOne.mockResolvedValueOnce(null)

    const response = await loginController.handler({ body: mockRequestBody })

    expect(findUserMock.findOne).toHaveBeenCalledWith({ email: mockRequestBody.email })
    expect(response.status).toBe(400)
    expect(response.data).toBe('Usuário não encontrado')
  })

  it('should return BadRequest response with error message if password is incorrect', async () => {
    findUserMock.findOne.mockResolvedValueOnce(mockUser)
    bcryptMock.compare.mockResolvedValueOnce(Promise.resolve(false))

    const response = await loginController.handler({ body: mockRequestBody })

    expect(findUserMock.findOne).toHaveBeenCalledWith({ email: mockRequestBody.email })
    expect(bcryptMock.compare).toHaveBeenCalledWith(mockRequestBody.password, mockUser.password)
    expect(response.status).toBe(400)
    expect(response.data).toBe('Senha incorreta')
  })

  it('should return BadRequest response with error message if an error occurs', async () => {
    findUserMock.findOne.mockRejectedValueOnce(new Error('Internal Server Error'))

    const response = await loginController.handler({ body: mockRequestBody })

    expect(findUserMock.findOne).toHaveBeenCalledWith({ email: mockRequestBody.email })
    expect(response.status).toBe(400)
    expect(response.data).toBe('Internal Server Error')
  })
})
