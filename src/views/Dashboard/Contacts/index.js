import React from 'react';
import ContactTable from './components/ContactTable';
import Modal from '../../../components/Modal/index';
import SearchInput from '../../../components/SearchInput';
class Contacts extends React.Component {
  onContactEdit = contact => {
    console.log(contact);
    this.openModalHandler()
    this.setState({
           userdata:JSON.stringify(contact),
            header:'Edit Contact',
    });
  };
  onContactDelete = contact => {
    console.log(contact);
    this.openModalHandler()
    this.setState({
            userdata:JSON.stringify(contact),
            header:'Delete Contact',
    });
    console.log(this.state)
  };
   constructor() {
        super();

        this.state = {
            isShowing: false,
            header:'Edit Contact',
            userdata:null
        }
    }

    openModalHandler = () => {
        this.setState({
            isShowing: true
        });
    }

    closeModalHandler = () => {
        this.setState({
            isShowing: false

        });
        console.log('ssss')
    }


  render() {
    const defaultStyle = {
       background: '#29cb98',
      borderColor: '#29cb98',
      padding:"11px"
    }
    return (

      <div>
       { this.state.isShowing ? <div onClick={this.closeModalHandler} className="back-drop"></div> : null }
      <div style={{ padding: '40px' }}>
        <div className="row">
          <div className="col-md-9 col-xs-12 col-sm-9 col-lg-9">
            <SearchInput placeholder="Search contacts"/>
          </div>
          <div className="col-md-3 col-xs-12 col-sm-3 col-lg-3">
            <button className="btn btn-success btn-block sucss_btn" style={defaultStyle}><i className="ion-ios-plus"></i>&nbsp;&nbsp;Add contact</button>
          </div>
        </div>
        <br />  <br /> 
        <ContactTable
          onContactDelete={this.onContactDelete}
          onContactEdit={this.onContactEdit}
        />
      </div>
      <Modal
          className="modal"
          show={this.state.isShowing}
          close={this.closeModalHandler}
          header={this.state.header}
          actionTitle="Save"
          >
          <form action="">
              <div className="row">
                <div className="col-md-6">
                  <div class="div_input border_none">
                    <label for="">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="johndoe@gmail.com"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div class="div_input">
                    <label for="">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="*******"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div class="div_input">
                    <label for="">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="*******"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div class="div_input">
                    <label for="">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="*******"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div class="div_input">
                    <label for="">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="*******"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div class="div_input">
                    <label for="">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="*******"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div class="div_input">
                    <label for="">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="*******"
                    />
                  </div>
                </div>
              </div>
              
          </form>
      </Modal>
      </div>
    );
  }
}

export default Contacts;
