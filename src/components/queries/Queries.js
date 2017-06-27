/**
 * Constant queries
 * Query builder
 * Complex queries
 * Elementary queries
 */
import React, { Component } from "react"
import { connect } from "react-redux"
import { List } from "immutable"

import { addQuery, addQueryToDb } from "../../store/actions/queriesActions"
import {
  constQueriesSelector,
  elementaryQueriesSelector,
  complexQueriesSelector
} from "../../store/selectors/queriesSelectors"
import Query, { QUERY_TYPES } from "../../containers/Query"

import QueriesList from "./queriesList/QueriesList"
import QueryBuilder from "./queryBuilder/QueryBuilder"

class Queries extends Component {

  constructor(props) {
    super(props)

    this.state = {
      builderQueries: List(),
    }

    this.addQueryToBuilder = this.addQueryToBuilder.bind(this)
    this.createBuilderQuery = this.createBuilderQuery.bind(this)
    this.removeQueryFromBuilder = this.removeQueryFromBuilder.bind(this)
    this.createQuery = this.createQuery.bind(this)
    this.toQueryBuilder = this.toQueryBuilder.bind(this)
  }

  /**
   * Creates query and push it to the query builder if needed
   */
  createBuilderQuery(queryName, add) {
    const builderQueries = this.state.builderQueries
    if (!this.props.queries.has(queryName)) {
      if (this.props.user.is_admin) {
        const q = {
          name: queryName,
          value: builderQueries.size <= 1 || add ? queryName : "",
          items: builderQueries.size <= 1 || add
            ? []
            : Array.prototype.concat.apply([], builderQueries.map(q => q.get('name')).toArray()),
        }
        this.props.dispatch(addQueryToDb(q))
      } else {
        this.props.dispatch(addQuery(this.createQuery(queryName, add)))
      }
    }

    if (add) {
      this.toQueryBuilder(queryName, add)
    } else {
      this.setState({
        builderQueries: List(),
      })
    }
  }

  toQueryBuilder(queryName, add) {
    this.addQueryToBuilder(this.createQuery(queryName, add))
  }

  createQuery(queryName, add){
    const builderQueries = this.state.builderQueries
    return new Query({
      name: queryName,
      value: builderQueries.size <= 1 || add ? queryName : "",
      items: builderQueries.size <= 1 || add ? List() : builderQueries,
      type: builderQueries.size <= 1 || add ? QUERY_TYPES.ELEMENTARY : QUERY_TYPES.COMPLEX,
    })
  }

  addQueryToBuilder(query) {
    this.setState({
      builderQueries: this.state.builderQueries.push(query),
    })
  }

  removeQueryFromBuilder(index) {
    this.setState({
      builderQueries: this.state.builderQueries.remove(index),
    })
  }

  render() {
    return (
      <div>
        <QueriesList
          className="const-queries"
          buttonClassName="btn btn-primary"
          queries={this.props.constQueries}
          selectQuery={this.addQueryToBuilder}
        />
        <QueryBuilder
          builderQueries={this.state.builderQueries}
          createBuilderQuery={this.createBuilderQuery}
          removeQuery={this.removeQueryFromBuilder}
          toQueryBuilder={this.toQueryBuilder}
        />
        <QueriesList
          className="complex-queries"
          text="Complex queries"
          buttonClassName="btn btn-warning"
          queries={this.props.complexQueries}
          selectQuery={this.addQueryToBuilder}
          showSearch
        />
        <QueriesList
          className="elementary-queries"
          text="Elementary queries"
          buttonClassName="btn btn-success"
          queries={this.props.elementaryQueries}
          selectQuery={this.addQueryToBuilder}
          showSearch
        />
      </div>
    )
  }
}

export default connect(state => ({
  constQueries: constQueriesSelector(state),
  elementaryQueries: elementaryQueriesSelector(state),
  complexQueries: complexQueriesSelector(state),
  user: state.user,
  queries: state.queries
}))(Queries)