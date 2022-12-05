class TreeStore {
  constructor(array) {
    this.array = array;
  }

  getAll() {
    return this.array
  }

  getItem(id) {
    return this.array.find(obj => obj.id === id)
  }

  getChildren(id, result = []) {
    this.array.forEach(el => el.parent === id ? result.push(el) : false)
    return result
  }

  getAllChildren(id, result = []) {
    result = this.getChildren(id)
    result.forEach(el => {
      result.push(...this.getAllChildren(el.id))
    })

    return result
  }

  getParent(id) {
    return this.array.find(obj => obj.id === this.getItem(id).parent)
  }

  getAllParents(id) {
    let result = [];
    result.push(this.getParent(id))
    typeof result[result.length - 1].parent === 'number' ? result.push(...this.getAllParents(result[result.length - 1].id)) : false

    return result
  }
}

const items = [
  {id: 1, parent: 'root'},
  {id: 2, parent: 1, type: 'test'},
  {id: 3, parent: 1, type: 'test'},

  {id: 4, parent: 2, type: 'test'},
  {id: 5, parent: 2, type: 'test'},
  {id: 6, parent: 2, type: 'test'},

  {id: 7, parent: 4, type: null},
  {id: 8, parent: 4, type: null},
];

const ts = new TreeStore(items);

console.log(ts.getAll())
console.log(ts.getItem(8))
console.log(ts.getChildren(4))
console.log(ts.getChildren(7))
console.log(ts.getChildren(2))
console.log(ts.getAllChildren(1))
console.log(ts.getParent(7))
console.log(ts.getAllParents(7))