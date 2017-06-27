import React, { Component } from "react"
import { connect } from "react-redux"
import Chips from "react-chips"
import Alert from 'react-s-alert';

import { QUERY_TYPES } from "../../../containers/Query"

import Modal from "../../shared/Modal"

class QueryBuilder extends Component {

  constructor(props) {
    super(props)

    this.state = {
      queryName: "",
      saving: false,
      toCopy: "default",
    }

    this.changeName = this.changeName.bind(this)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.saveQuery = this.saveQuery.bind(this)
    this.onChange = this.onChange.bind(this)
    this.openLinkedIn = this.openLinkedIn.bind(this)
    this.getRealValue = this.getRealValue.bind(this)
    this.copyQuery = this.copyQuery.bind(this)
  }

  onChange(newQueries) {
    let oldChips = this.props.builderQueries.map(query => query.get('name')).toArray()
    if (newQueries.length > oldChips.length) {
      if (this.props.data.find(query => query.get('name') === newQueries[newQueries.length - 1]) === undefined) {
        this.props.createBuilderQuery(newQueries[newQueries.length - 1], true)
      } else {
        this.props.toQueryBuilder(newQueries[newQueries.length - 1], true)
      }
    }
    if (newQueries.length < oldChips.length) {
      for (let i = 0; i < oldChips.length; i++) {
        if (oldChips[i] !== newQueries[i]) {
          this.props.removeQuery(i)
          break
        }
      }
    }
  }

  changeName(event) {
    this.setState({
      queryName: event.target.value,
    })
  }

  openModal() {
    this.setState({
      saving: true,
    })
  }

  closeModal() {
    this.setState({
      saving: false,
    })
  }

  saveQuery() {
    this.closeModal()
    this.props.createBuilderQuery(this.state.queryName)
  }

  openLinkedIn() {
    let url = 'https://www.linkedin.com/search/results/index/?keywords=' +
      encodeURIComponent(this.getRealValue(this.props.builderQueries)) +
      '&origin=GLOBAL_SEARCH_HEADER';

    window.open(url, '_blank').focus();
    Alert.success('New card in your browser id opened with results.');
  }

  getRealValue(queries) {
    return queries.map(query =>
      query.get('type') === QUERY_TYPES.COMPLEX
        ? this.getRealValue(query.get('items'))
        : query.get('value'))
      .toArray().join(' ')
  }

  copyQuery() {
    this.setState({toCopy: this.getRealValue(this.props.builderQueries)})
    setTimeout(function () {
      document.querySelector("#toCopy").select();
      document.execCommand('copy');
    }, 1);
    Alert.success('Query is copied.');
  }

  render() {
    const {saving} = this.state
    const {builderQueries, data} = this.props

    return (
      <div className="queryBuilder">
        <Chips
          placeholder="Type a name of existing query or crete new one"
          value={builderQueries.map(query => query.get('name')).toArray()}
          onChange={this.onChange}
          suggestions={data.map(query => query.get('name')).toArray()}
          fromSuggestionsOnly={false}
          uniqueChips={false}
          createChipKeys={[13, 32]}
          highlightFirstSuggestion={false}
        />

        <button type="button" className="btn btn-outline-primary" onClick={this.openModal}>Create</button>
        <button type="button" className="btn btn-outline-primary" onClick={this.copyQuery}>Copy</button>
        <button type="button" className="btn btn-outline-primary" onClick={this.openLinkedIn}>LinkedIn</button>
        <input onChange={() => {
        }} id="toCopy" value={this.state.toCopy}/>

        {saving && <Modal closeModal={this.closeModal} header="Create new query">
          <div className="nameBody">
            <input className="form-control" onChange={this.changeName} name="Name" placeholder="Name"/>
          </div>
          <div className="modal-footer">
            <button type="button" onClick={this.saveQuery} className="btn btn-primary">Save</button>
            <button type="button" onClick={this.closeModal} className="btn btn-secondary">Close</button>
          </div>
        </Modal>}
      </div>
    )
  }
}

export default connect(state => ({data: state.queries}))(QueryBuilder)