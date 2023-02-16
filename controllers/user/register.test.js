const dotenv = require('dotenv');
dotenv.config();
const { User } = require('../../models');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { verificationToken } = process.env;

const mockReq = (body) => ({
  body,
});

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('register', () => {
  const register = require('./register');

  let req;
  let res;
  beforeEach(() => {
    req = mockReq({
      email: 'test@example.com',
      password: 'password',
      name: 'Test User',
      cityRegion: 'Test City',
      mobilePhone: '1234567890',
      birthday: '01/01/1999',
    });
    res = mockRes();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns 409 and error message if email is already in use', async () => {
    const findOne = jest.spyOn(User, 'findOne').mockResolvedValue({});
    await register(req, res);
    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ message: 'Email is already in use' });
    findOne.mockRestore();
  });

  it('returns 201 and success message if user registration is successful', async () => {
    const findOne = jest.spyOn(User, 'findOne').mockResolvedValue(null);
    const create = jest.spyOn(User, 'create').mockResolvedValue({});
    await register(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: 'User added',
      email: req.body.email,
      name: req.body.name,
      cityRegion: req.body.cityRegion,
      mobilePhone: req.body.mobilePhone,
      avatarURL: expect.any(String),
      birthday: req.body.birthday,
    });
    findOne.mockRestore();
    create.mockRestore();
  });
});