import React, { Component } from "react"

class QueryItem extends Component {

  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    this.props.selectQuery(this.props.query)
  }

  render() {
    const {query} = this.props
    const className = "queries-item " + this.props.buttonClassName
    return (
      <div>
        <button role="button" className={className} onClick={this.handleClick}>
          {query.name}
        </button>
      </div>
    )
  }
}

export default QueryItem