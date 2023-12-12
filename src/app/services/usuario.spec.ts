import { Usuario } from './usuario';

describe('Usuario', () => {
  it('should create an instance', () => {
    expect(new Usuario()).toBeTruthy();
  });

  it('should be able to access to atributes', () => {
    let usuario = new Usuario();
    usuario.id_usuario = 1;
    usuario.nombre = "Usuario 1";
    usuario.correo = "Email 1";
    usuario.password = "Password 1";
    expect(usuario.id_usuario).toEqual(1);
    expect(usuario.nombre).toEqual("Usuario 1");
    expect(usuario.correo).toEqual("Email 1");
    expect(usuario.password).toEqual("Password 1");
  });
});
