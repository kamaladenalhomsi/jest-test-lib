export default class Model {
  constructor(data = []) {
    this.$collection = [];

    if (data.length)
      this.record(data)
  }

  record(data) {
    this.$collection.push(...data);
  }
  all() {
    return this.$collection.map(entry => Object.assign({}, entry));
  }
  find(value) {
    const primaryKey = 'id';
    const entry = this.$collection.find(entry => entry[primaryKey] === value);
    return entry ? Object.assign({}, entry) : null;
  }
  update() { }
}
