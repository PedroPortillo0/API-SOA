import request from 'supertest';
import app from '../../src/Server';  
import db from '../../src/config/db';

describe('User API Integration Tests', () => {
  beforeAll(async () => {
    await db.query('DELETE FROM users');
    await db.query('DELETE FROM tokens');
  });

  it('Debería registrar un usuario y enviar un token por WhatsApp', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({
        email: 'usuario@example.com',
        password: 'password123',
        phone: '+521234567890',
      });
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('uuid');
    expect(response.body).toHaveProperty('message', 'Usuario registrado con éxito. Token enviado por WhatsApp.');

    const [users] = await db.query<any[]>('SELECT * FROM users WHERE email = ?', ['usuario@example.com']);
    expect(users.length).toBe(1);

    const [tokens] = await db.query<any[]>('SELECT * FROM tokens WHERE user_id = ?', [users[0].id]);
    expect(tokens.length).toBe(1);
  });

  it('Debería verificar el usuario con el token correcto', async () => {
    const [user] = await db.query<any[]>('SELECT * FROM users WHERE email = ?', ['usuario@example.com']);
    
    const [token] = await db.query<any[]>('SELECT * FROM tokens WHERE user_id = ?', [user[0].id]);

    const response = await request(app)
      .post('/api/users/verify-token')
      .send({
        uuid: user[0].uuid,
        token: token[0].token,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Usuario verificado con éxito');

    const [updatedUser] = await db.query<any[]>('SELECT * FROM users WHERE id = ?', [user[0].id]);
    expect(updatedUser[0].is_verified).toBe(1);
  });
});
