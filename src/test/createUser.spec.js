import request from 'supertest';
import app from '../server.js';
import UserService from '../services/user.services.js';
const userService = new UserService();

describe('Pruebas para la creación de usuarios', () => {
  it('debería crear un nuevo usuario correctamente', async () => {
    //etapa de preparacion
    const userTest = await request(app)
      .post('/api/users/register')
      .send({
        first_name: 'Cosme',
        last_name: 'Fulanito',
        email: 'fulanitoc@example.com', age: 30,
        password: 'password'
      });
    
    //etapa de ejecucion
    //const newUserTest = userService.createUser(userTest);

    //etapa de verificacion
    //expect(newUserTest).toBe(userTest);
  });
});