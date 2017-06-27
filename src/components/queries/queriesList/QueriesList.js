import React, { Component } from "react"

import QueryItem from "./QueryItem"
import Search from "../../shared/Search"

class QueriesList extends Component {

  constructor(props) {
    super(props)

    this.state = {
      search: "",
      queries: props.queries,
    }

    this.updateSearch = this.updateSearch.bind(this)
    this.updateState = this.updateState.bind(this)
  }

  componentWillReceiveProps(props) {
    if (props.queries !== this.state.queries) {
      const {search} = this.state
      const searchTerm = search.toLowerCase()
      const queries = searchTerm.length > 0
        ? props.queries.filter(query => query.name.toLowerCase().includes(searchTerm))
        : props.queries
      this.updateState(search, queries)
    }
  }

  updateSearch(event) {
    const search = event.target.value
    const searchTerm = search.toLowerCase()
    const queries = searchTerm.length > 0
      ? this.props.queries.filter(query => query.name.toLowerCase().includes(searchTerm))
      : this.props.queries
    this.updateState(search, queries)
  }

  updateState(search, queries) {
    this.setState({
      search,
      queries,
    })
  }

  render() {
    const {showSearch, className, selectQuery, text} = this.props
    const {queries, search} = this.state

    const mainClass = "queries-list " + className
    return (
      <div className={mainClass}>
        {showSearch && <Search text={text} search={search} updateSearch={this.updateSearch}/>}
        <div>
        {queries.map((query, index) => <QueryItem buttonClassName={this.props.buttonClassName} key={index}
                                                  selectQuery={selectQuery} query={query}/>)}
        </div>
      </div>
    )
  }
}

export default QueriesList