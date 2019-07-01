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
  const heros = [{name: "Batman"}, {name: 'Superman'}];
  test('can add to the collection', () => {
    const model = new Model();
    model.record(heros);
    expect(model.$collection).toEqual(heros);
  });

  test('gets called when data is passed to Model', ()  => {
    const model = new Model(heros);
    expect(model.$collection).toEqual(heros);
  });
})