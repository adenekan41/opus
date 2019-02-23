import React from 'react';
// 
import { ModalStyleLayout } from './style';
import './Modal.css';
const modal = (props) => {
    return (
       <ModalStyleLayout>
        <div>
        <div className="modal modal-wrapper" id="myModal" style={{
                    transform: props.show ? 'translateY(10vh)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">

              
              <div className="modal-header">
                <h4 className="modal-title text-center">{props.header}</h4>
              </div>

             
              <div className="modal-body">
                 {props.children}
                 <br />
                 <div className="modal-footers">
                <div className="row">
                    <div className="col-md-6">
                        <button type="button" className="btn btn-dark btn-block" onClick={props.close}>Cancle</button>
                    </div>
                    <div className="col-md-6">
                        <button type="button" className="btn btn-warning btn-block" onClick={props.action}>{props.actionTitle}</button>
                    </div>
                </div>
              </div>
              </div>

             
              

            </div>
          </div>
        </div>
          
        </div>
        </ModalStyleLayout>
        
    )
}

export default modal;
