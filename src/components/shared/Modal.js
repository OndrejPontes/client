import React from 'react'

const Modal = props => (
  <div className="modal fade" id="modal"
       onClick={props.closeModal}>
    <div className="modal-dialog" role="document" onClick={e => e.stopPropagation()}>
      <div className="modal-content">
        {
          props.header &&
          <div className="modal-header" id="modal-header">
            <h5 className="modal-title">{props.header}</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={props.closeModal}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        }
        { props.children }
      </div>
    </div>
  </div>
)

export default Modal