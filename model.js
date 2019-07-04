export default class Model {
  constructor(options = {}) {
    const data = options.data || [];
    delete options.data 
    this.$collection = [];
    this.$options = Object.assign({primaryKey: 'id'}, options);
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
    const entry = this.$collection.find(entry => entry[this.$options.primaryKey] === value);
    return entry ? Object.assign({}, entry) : null;
  }
  update(key, data) {
    const index = this.$collection.findIndex(entry => entry[this.$options.primaryKey] === key);
    if(index < 0) return false;
    this.$collection.splice(index, 1, Object.assign(this.$collection[index], data))
  }
  delete(key) {
    const index = this.$collection.findIndex(entry => entry[this.$options.primaryKey] === key);
    if(index < 0) return false;
    let deleted = this.$collection.splice(index, 1);
    return deleted[0];
  }
}

