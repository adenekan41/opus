import React from 'react';
//
import { ModalStyleLayout } from './style';
import './Modal.css';

export class ToggleModal extends React.Component {
  state = {
    show: this.props.show || false,
  };
  openModal = () => {
    this.setState({
      show: true,
    });
  };
  closeModal = () => {
    this.setState({
      show: false,
    });
  };
  render() {
    return (
      <>
        {this.props.children(this.state.show, this.openModal, this.closeModal)}
      </>
    );
  }
}

const Modal = props => {
  return (
    <ModalStyleLayout>
      {props.show && (
        <div className="back-drop">
          <div
            className="modal modal-wrapper"
            id="myModal"
            style={{
              transform: props.show ? 'translateY(10vh)' : 'translateY(-100vh)',
              opacity: props.show ? '1' : '0',
            }}
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title text-center">{props.header}</h4>
                </div>

                <div className="modal-body">
                  {props.children}
                  <br />
                  {props.actionTitle && (
                    <div className="modal-footers">
                      <div className="row">
                        <div className="col-md-6">
                          <button
                            type="button"
                            className="btn btn-dark btn-block"
                            onClick={props.close}
                          >
                            Cancel
                          </button>
                        </div>
                        <div className="col-md-6">
                          <button
                            type="button"
                            className="btn btn-warning btn-block"
                            onClick={props.action}
                          >
                            {props.actionTitle}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </ModalStyleLayout>
  );
};

export default Modal;
