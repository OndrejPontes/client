import React  from "react"

const Search = props => (
  <div className="row">
    <div className="queriesName">{props.text}</div>
    <div className="col align-self-end">
      <div className="input-group" id="search">
        <input type="text" className="form-control" value={props.search} onChange={props.updateSearch}
               placeholder="Search queries"/>
      </div>
    </div>
  </div>
)

export default Search