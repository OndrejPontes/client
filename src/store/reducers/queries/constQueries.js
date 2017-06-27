import Query, { QUERY_TYPES } from "../../../containers/Query"

export const and = new Query({
	name: "AND",
	value: "AND",
	type: QUERY_TYPES.CONSTANT,
})
export const or = new Query({
	name: "OR",
	value: "OR",
	type: QUERY_TYPES.CONSTANT,
})
export const not = new Query({
	name: "NOT",
	value: "NOT",
	type: QUERY_TYPES.CONSTANT,
})
export const leftBracket = new Query({
	name: "(",
	value: "(",
	type: QUERY_TYPES.CONSTANT,
})
export const rightBracket = new Query({
	name: ")",
	value: ")",
	type: QUERY_TYPES.CONSTANT,
})