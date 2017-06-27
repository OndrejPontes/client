import Query, { QUERY_TYPES } from "../../../containers/Query"

const data = ["Java", "JavaScript", ".Net", "Python", "Haskell", "Elixir", "React", "Ruby", "Rust"]

export default data.map(item =>
	new Query({
		name: item,
		value: item,
		type: QUERY_TYPES.ELEMENTARY,
	})
)