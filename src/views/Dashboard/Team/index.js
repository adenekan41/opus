import React from 'react';
import TeamTable from './components/TeamTable';
import Modal from '../../../components/Modal/index';
import SearchInput from '../../../components/SearchInput';
class Teams extends React.Component {
  onTeamEdit = team => {
    console.log(team);
    this.openModalHandler()
    
  };
  onTeamDelete = team => {
    console.log(team);
    this.openModalHandler()
   
    console.log(this.state)
  };
   constructor() {
        super();

        this.state = {
            isShowing: false,
            header:'Invite team member',
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
            <SearchInput placeholder="Search team members"/>
          </div>
          <div className="col-md-3 col-xs-12 col-sm-3 col-lg-3">
            <button onClick={this.openModalHandler} className="btn btn-success btn-block sucss_btn" style={defaultStyle}><i className="ion-ios-plus"></i>&nbsp;&nbsp;Invite Team Member</button>
          </div>
        </div>
        <br />  <br /> 
        <TeamTable
          onTeamDelete={this.onTeamDelete}
          onTeamEdit={this.onTeamEdit}
        />
      </div>
      <Modal
          className="modal"
          show={this.state.isShowing}
          close={this.closeModalHandler}
          header={this.state.header}
          actionTitle="Invite"
          >
          <p>Please enter the email address of the team member you would like to invite.</p>
          <form action="">
              <div className="row">
                <div className="col-md-12">
                  <div class="div_input border_none">
                    <label for="">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="johndoe@gmail.com"
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

export default Teams;
