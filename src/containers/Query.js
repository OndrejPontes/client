import { Record, List } from 'immutable'

// Types: constant, elementary, complex
export const QUERY_TYPES = {
  CONSTANT: "CONSTANT",
  ELEMENTARY: "ELEMENTARY",
  COMPLEX: "COMPLEX",
}

const QueryRecord = Record({
  id: -1,
  name: "",
  value: "",
  items: List(),
  type: QUERY_TYPES.ELEMENTARY,
  created_at: new Date(),
  updated_at: new Date(),
})

class Query extends QueryRecord {

  update(query) {
    return this.set("name", query.name).set("items", query.items)
  }

  changeName(name) {
    return this.set("name", name)
  }

  addItem(item) {
    return this.items.size + 1 > 1
      ? this.set("items", this.items.push(item)).set("type", QUERY_TYPES.COMPLEX)
      : this.set("items", this.items.push(item))
  }

  removeItem(index) {
    return this.items.size - 1 <= 1
      ? this.set("items", this.items.delete(index)).set("type", QUERY_TYPES.ELEMENTARY)
      : this.set("items", this.items.delete(index))
  }

  getItemsValue() {
    return this.type === QUERY_TYPES.COMPLEX
      ? this.items.map(item => item.get('name')).toArray().join(" ")
      : this.name
  }
}

export default Query