import styled from 'styled-components';

export const ModalStyleLayout = styled.div`
  .modal-wrapper {
    z-index: 999999999999999999999999 !important;
    position: fixed;
    top: 0;
    left: 0;

    display: block !important;
    width: 100%;
    height: 100%;
    overflow: hidden;
    outline: 0;
  }
  .modal-content {
    border: none !important;
    border-radius: 5px;
    background-color: #f5f6fa !important;
  }
  .modal-body {
    padding: 1.5rem 3rem;
  }
  .modal-footers button {
    padding: 8px;
    border-radius: 3px !important;
    border: none !important;
  }

  .modal-header {
    -webkit-justify-content: center !important;
    justify-content: center !important;
    padding: 3rem 0rem 0rem 0rem !important;
    border-bottom: none !important;
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;
    h4 {
      font-size: 22px;
      font-weight: 900;
      font-style: normal;
      font-stretch: normal;
      line-height: normal;
      letter-spacing: 0.3px;
      text-align: center;
      color: #242424;
    }
  }
  .modal-lg {
    max-width: 729px !important;
  }

  .back-drop {
    background-color: rgba(48, 49, 48, 0.42);
    height: 100%;
    position: fixed;
    transition: all 1.3s;
    left: 0;
    width: 100%;
    z-index: 99;
    top: 0;
    right: 0;
    bottom: 0;
  }
  .div_input label {
    margin-bottom: 0;
    color: #252b33;
    margin-left: 1rem;
    font-size: 13px;
    margin-top: 0.5rem;
    opacity: 0.5;
  }
  .div_input input {
    border: none;
    color: #000000;

    box-shadow: none !important;
    padding: 6px 17px !important;
  }

  .div_input {
    padding: 1px;
    background: #fff;
    margin-bottom: 3%;
    box-shadow: 0 10px 14px -4px rgba(70, 70, 70, 0.06);
    border-top: 1px solid #e9e9e9 !important;
  }
  .div_input:hover {
    border-left: 3px solid #19272d !important;
  }
  .open-modal-btn {
    margin: 15px;
    padding: 10px;
    font-weight: bold;
  }
`;
