import Model from './model';

function createModel(data = [], options = {}) {
  return new Model({
    ...options,
    data
  });
}

test('new works', () => {
  expect(createModel()).toBeInstanceOf(Model);
});

test('model structure', () => {
  expect(createModel()).toEqual(expect.objectContaining({
    $collection: expect.any(Array),
    $options: expect.objectContaining({
      primaryKey: 'id'
    }),
    record: expect.any(Function),
    all: expect.any(Function),
    find: expect.any(Function),
    update: expect.any(Function)
  }));
});

describe('record', () => {
  const heros = [{ name: "Batman" }, { name: 'Superman' }];
  test('can add to the collection', () => {
    const model = createModel();
    model.record(heros);
    expect(model.$collection).toEqual(heros);
  });

  test('gets called when data is passed to Model', () => {
    let spy = jest.spyOn(Model.prototype, 'record');
    const model = createModel(heros);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

});

describe('all', () => {
  test('null data', () => {
    const model = createModel();
    expect(model.all()).toEqual([]);
  });

  test('returns data', () => {
    const model = createModel([{ name: "Batman" }, { name: "Superman" }]);
    expect(model.all().length).toEqual(2);
  });

  test('Orginal Data stays intact', () => {
    const model = createModel([{ name: "Kamal" }]);
    let data = model.all();
    data[0].name = "Amer";
    expect(model.$collection[0].name).toBe("Kamal");
  });

});

describe('find', () => {
  const heros = [{ name: "Batman", id: 1 }, { name: "Superman", id: 2 }];
  test('returns null if nothing matches', () => {
    const model = createModel();
    expect(model.find(1)).toEqual(null);
  });

  test('find and returns a matching entry', () => {
    const model = createModel(heros);
    expect(model.find(1)).toEqual(heros[0]);
  });
});


describe('update', () => {
  const heroesAndVillains = [{id: 1, name: "Batman"}];
  let model;

  beforeEach(() => {
    let dataset = JSON.parse(JSON.stringify(heroesAndVillains));
    model = createModel(dataset);
  })

  test('an entry by id', () => {
    model.update(1, { name: 'Joker' });
    expect(model.find(1).name).toBe('Joker');
  })

  test('extend an entry by id', () => {
    model.update(1, {cape: true})
    expect(model.find(1)).toEqual(expect.objectContaining({
      name: "Batman",
      cape: true 
    }));
  });

  test('returns false if no id match', () => {
    expect(model.update(3, {})).toBe(false);
  });

})

describe('customizations', () => {
  test('we can customize the primaryKey', () => {
    const model = createModel([], {
      primaryKey: 'name'
    })
    expect(model.$options.primaryKey).toBe('name'); 
  })
});

describe('delete', () => {

  const heros = [{id: 1, name: "Batman"}];
  const dataset = JSON.parse(JSON.stringify(heros));
  test('return false when not found', () => {
    const model = createModel();
    expect(model.delete(2)).toBe(false);
  });

  test('delete the record if exist', () => {
    const model = createModel(dataset);
    model.delete(1);
    expect(model.$collection.length).toEqual(0);
  });

  test('return the deleted record', () => {
    const model = createModel(dataset);
    let deletedRecord = model.delete(1);
    expect(deletedRecord).toEqual(heros[0]);
  })

});