import Model from './model';

test('new works', () => {
  expect(new Model).toBeInstanceOf(Model);
});

test('model structure', () => {
  expect(new Model).toEqual(expect.objectContaining({
    $collection: expect.any(Array),
    record: expect.any(Function),
    all: expect.any(Function),
    find: expect.any(Function),
    update: expect.any(Function)
  }));
});

describe('record', () => {
  const heros = [{ name: "Batman" }, { name: 'Superman' }];
  test('can add to the collection', () => {
    const model = new Model();
    model.record(heros);
    expect(model.$collection).toEqual(heros);
  });

  test('gets called when data is passed to Model', () => {
    let spy = jest.spyOn(Model.prototype, 'record');
    const model = new Model(heros);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

});

describe('all', () => {
  test('null data', () => {
    const model = new Model();
    expect(model.all()).toEqual([]);
  });

  test('returns data', () => {
    const model = new Model([{ name: "Batman" }, { name: "Superman" }]);
    expect(model.all().length).toEqual(2);
  });

  test('Orginal Data stays intact', () => {
    const model = new Model([{ name: "Kamal" }]);
    let data = model.all();
    data[0].name = "Amer";
    expect(model.$collection[0].name).toBe("Kamal");
  });

});

describe('find', () => {
  const heros = [{ name: "Batman", id: 1 }, { name: "Superman", id: 2 }];
  test('returns null if nothing matches', () => {
    const model = new Model();
    expect(model.find(1)).toEqual(null);
  });

  test('find and returns a matching entry', () => {
    const model = new Model(heros);
    expect(model.find(1)).toEqual(heros[0]);
  });
});