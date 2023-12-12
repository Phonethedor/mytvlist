import { Lista } from './lista';

describe('Lista', () => {
  it('should create an instance', () => {
    expect(new Lista()).toBeTruthy();
  });

  it('should be able to access to atributes', () => {
    let lista = new Lista();
    lista.id_lista = 1;
    lista.id_usuario = 1;
    lista.nombre = "Lista 1";
    expect(lista.id_lista).toEqual(1);
    expect(lista.id_usuario).toEqual(1);
    expect(lista.nombre).toEqual("Lista 1");
  });
});
