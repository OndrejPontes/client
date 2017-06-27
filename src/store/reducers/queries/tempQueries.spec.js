import { List } from "immutable"
import Query, { QUERY_TYPES } from "../../../containers/Query"
import { and } from "./constQueries"

const q1 = new Query({
	name: "q1",
	value: "Q1",
	type: QUERY_TYPES.ELEMENTARY,
})
const q2 = new Query({
	name: "q2",
	value: "Q2",
	type: QUERY_TYPES.ELEMENTARY,
})
const q3 = new Query({
	name: "q3",
	items: List([q1, and, q2]),
	type: QUERY_TYPES.COMPLEX,
})

describe("tempQueriesTest", () => {
	it("should not disappoint us", () => {
		expect(
			q1.getItemsValue()
		).toBe("Q1")
		expect(
			and.getItemsValue()
		).toBe("AND")
		
		expect(
			q3.getItemsValue()
		).toBe("Q1 AND Q2")
	})
})
