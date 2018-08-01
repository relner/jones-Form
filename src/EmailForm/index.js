import React, { Component } from 'react';
import InputField from '../InputField';
import './style.css'

let errorMessages = {
  strLenght: 'The length must be bigger of 2 letter',
  alphaBetLetters: 'Only alphabet letters',
  validEmail: 'Please enter valid email address',
  validPhone: 'Please enter only numbers',
  validPhoneLenght: 'Phone number must be exactly 10 digits',
  successfullySend:'The form was sent successfully'
};

class EmailForm extends Component {
  constructor(props){
    super(props)

    this.state = {
      firstName: '',
      firstNameErrorMessage: '',
      lastName: '',
      lastNameErrorMessage: '',
      email: '',
      emailErrorMessage: '',
      phone: '',
      phoneErrorMessage: '',
      successfullySend: ''
    };
  }

  render() {
    return (
      <form onSubmit={this.formSubmited}>
        <InputField inputType='text'
                    placeholder='First Name'
                    value={this.state.firstName}
                    onChangeFunc={this.firstNameChange}
                    errorMessage={this.state.firstNameErrorMessage}/>
        <InputField inputType='text' 
                    placeholder='Last Name' 
                    value={this.state.lastName}
                    onChangeFunc={this.lastNameChange}
                    errorMessage={this.state.lastNameErrorMessage}/>
        <InputField inputType='text' 
                    placeholder='email' 
                    value={this.state.email}
                    onChangeFunc={this.emailChange}
                    errorMessage={this.state.emailErrorMessage}/>
        <InputField inputType='text' 
                    placeholder='phone' 
                    value={this.state.phone}
                    onChangeFunc={this.phoneChange}
                    errorMessage={this.state.phoneErrorMessage}/>
        <button >Send</button>
        {this.state.successfullySend && <div className='successMessage'>{this.state.successfullySend}</div>}
      </form>
    );
  }

  formSubmited = (event) => {
    event.preventDefault();
    if(!this.validateFunction()) return;
    console.log(this.state.firstName, this.state.lastName, this.state.email, this.state.phone)
    
    let emailObject = {
      subject: 'New Lead',
      content: {
        FirstName: this.state.firstName,
        LastName: this.state.lastName,
        MailAddress: this.state.email, 
        PhoneNumber: this.state.phone
      }
    };
    this.sendToServerData(emailObject)
  }

  sendToServerData = (data) => {
      const requestOptions = {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json; charset=utf-8' }
      };
      return fetch(`http://localhost/send-email-test/mail.php`, requestOptions)
        .then(responce => {
            this.setState( {successfullySend: errorMessages.successfullySend,
                            firstName: '',
                            lastName: '',
                            email: '',
                            phone: ''})
                          }).catch(error => console.error('Error:', error))
  }

  firstNameChange = (event) => {
    this.setState({firstName: event.target.value}, () => {
      this.validateFirstName()
    });
  }

  lastNameChange = (event) => {
    this.setState({lastName: event.target.value}, () => {
      this.validateLastName()
    });
  }

  emailChange = (event) => {
    this.setState({email: event.target.value}, () => {
      this.validateEmail()
    });
  }

  phoneChange = (event) => {
    this.setState({phone: event.target.value}, () => {
      this.validationPhone()
    });
  }


  validateFunction(){
    if(this.validateFirstName() & this.validateLastName() & this.validateEmail() & this.validationPhone()) return true;
    return false;
  }

  //validation functions
  validateFirstName(){
    if(this.state.firstName.length < 2) {
      this.setState({firstNameErrorMessage: errorMessages.strLenght})
      return false;
    }
    if(!this._checkAlphaBetLetters(this.state.firstName)){
      this.setState({firstNameErrorMessage: errorMessages.alphaBetLetters})
      return false;
    }
    this.setState({firstNameErrorMessage: ''})
    return true;
  }

  validateLastName(){
    if(this.state.lastName.length < 2) {
      this.setState({lastNameErrorMessage: errorMessages.strLenght})
      return false;
    }
    if(!this._checkAlphaBetLetters(this.state.lastName)){
      this.setState({lastNameErrorMessage: errorMessages.alphaBetLetters})
      return false;
    }
    this.setState({lastNameErrorMessage: ''})
    return true;
  }

  validateEmail(){
    if(!this._checkEmailFormat(this.state.email)){
      this.setState({emailErrorMessage: errorMessages.validEmail})
      return false;
    }
    this.setState({emailErrorMessage: ''})
    return true;
  }

  validationPhone(){
    if(!this._checkOnlyNumbers(this.state.phone)) {
      this.setState({phoneErrorMessage: errorMessages.validPhone})
      return false;
    }
    if(this.state.phone.length !== 10) {
      this.setState({phoneErrorMessage: errorMessages.validPhoneLenght})
      return false;
    }
    this.setState({phoneErrorMessage: ''})
    return true;
  }

  _checkAlphaBetLetters(str){
    let letters = /^[A-Za-z]+$/;
    if(!str.match(letters)){
      return false;
    }
    return true;
  }

  _checkOnlyNumbers(str){
    let numbers = /^[0-9]+$/;
    if(!str.match(numbers)){
      return false;
    }
    return true;
  }

  _checkEmailFormat(str){
    let emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!str.match(emailFormat)){
      return false;
    }
    return true;
  }

}

export default EmailForm;
