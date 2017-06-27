import { createSelector } from "reselect"

import { QUERY_TYPES } from "../../containers/Query"

const queriesSelector = state => state.queries

export const constQueriesSelector = createSelector(
  queriesSelector,
  (queries) => queries.filter(query => query.type === QUERY_TYPES.CONSTANT)
)

export const elementaryQueriesSelector = createSelector(
  queriesSelector,
  (queries) => queries.filter(query => query.type === QUERY_TYPES.ELEMENTARY)
)

export const complexQueriesSelector = createSelector(
  queriesSelector,
  (queries) => queries.filter(query => query.type === QUERY_TYPES.COMPLEX)
)

export const nonConstSelector = createSelector(
  queriesSelector,
  (queries) => queries.filter(query => query.type !== QUERY_TYPES.CONSTANT)
)