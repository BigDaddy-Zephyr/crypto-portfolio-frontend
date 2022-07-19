import React, { Component } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";


class GoogleLoginComponent extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      userInfo: {
        name: "",
        emailId: "",
      },
    };
  }

  // Success Handler
  responseGoogleSuccess = (response) => {
    fetch(process.env.REACT_APP_API_URL+'login', {
      method: "POST",
      body: JSON.stringify({
      token: response.tokenId
    }),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function(response) {
      return response.text();
    }).then(function(data) {
      console.log(data); // this will be a string
    });
    let userInfo = {
      name: response.profileObj.name,
      emailId: response.profileObj.email,
    };
    this.setState({ userInfo, isLoggedIn: true });
  }
  // Error Handler
  responseGoogleError = (response) => {
    console.log(response);
  };

  // Logout Session and Update State
  logout = (response) => {
    console.log(response);
    let userInfo = {
      name: "",
      emailId: "",
    };
    fetch(process.env.REACT_APP_API_URL+'logout', {
      method: "POST",
      body: JSON.stringify({
        token: "HELLO"
      }),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function(response) {
      return response.text();
    }).then(function(data) {
      console.log(data); // this will be a string
    });

    this.setState({ userInfo, isLoggedIn: false });
  };

  render() {
    return (
      <div >
        <div >
          {this.state.isLoggedIn ? (
            <div>
              {/* Welcome, {this.state.userInfo.name} */}
              <GoogleLogout
                clientId={process.env.REACT_APP_CLIENT_ID}
                buttonText={"Logout"}
                onLogoutSuccess={this.logout}
              ></GoogleLogout>
            </div>
          ) : (
            <GoogleLogin
              clientId={process.env.REACT_APP_CLIENT_ID}
              buttonText="Sign In with Google"
              onSuccess={this.responseGoogleSuccess}
              onFailure={this.responseGoogleError}
              isSignedIn={true}
              cookiePolicy={"single_host_origin"}
            />
          )}
        </div>
      </div>
    );
  }
}
export default GoogleLoginComponent;