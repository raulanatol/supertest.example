const { getAPI } = require("./config");

const api = getAPI('/users');

const getAllUsers = async () => {
  const response = await api.get('/');
  return response.body.users;
};

const createUser = async (user) =>
  await api.post('/').send(user);


describe('Users', () => {
  it('should create a new user', async () => {
    const result = await createUser({ name: 'Jane' });

    expect(result.statusCode).toBe(201);
    expect(result.body).toHaveProperty('result');
    expect(result.body.result).toBe('OK');
  });

  it('should add a single user', async () => {
    const initialUsers = await getAllUsers();

    await createUser({ name: 'Jane' });

    const newUsers = await getAllUsers();
    expect(newUsers).toHaveLength(initialUsers.length + 1);
  });
});
