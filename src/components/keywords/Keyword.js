import React  from 'react'

const Keyword = props => (
  <div>
    <div className="name">{ props.query.name }</div>
    <div className="value">{ props.query.getItemsValue() } </div>
    <div className="buttons">
      <button type="button" className="btn btn-outline-primary"
              onClick={() => props.openModal(props.query)}>Edit
      </button>
      <button type="button" className="btn btn-outline-danger"
              onClick={() => props.deleteQuery(props.query)}>Delete</button>
    </div>
  </div>
)


export default Keyword

