import { ListaSeries } from './lista-series';

describe('ListaSeries', () => {
  it('should create an instance', () => {
    expect(new ListaSeries()).toBeTruthy();
  });

  it('should be able to access to atributes', () => {
    let listaSeries = new ListaSeries();
    listaSeries.id_lista = 1;
    listaSeries.id_serie = 1;
    expect(listaSeries.id_lista).toEqual(1);
    expect(listaSeries.id_serie).toEqual(1);
  });

});
