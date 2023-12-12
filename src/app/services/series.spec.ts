import { Series } from './series';

describe('Series', () => {
  it('should create an instance', () => {
    expect(new Series()).toBeTruthy();
  });
  it('should be able to access to atributes', () => {
    let series = new Series();
    series.id_serie = 1;
    series.nombre = "Serie 1";
    series.descripcion = "Descripcion 1";
    series.imagen = "Imagen 1";
    series.temporadas = 1;
    series.capitulos = 1;
    expect(series.id_serie).toEqual(1);
    expect(series.nombre).toEqual("Serie 1");
    expect(series.descripcion).toEqual("Descripcion 1");
    expect(series.imagen).toEqual("Imagen 1");
    expect(series.temporadas).toEqual(1);
    expect(series.capitulos).toEqual(1);
  });
});
