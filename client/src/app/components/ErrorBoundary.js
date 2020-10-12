import React from 'react';
import styled from 'styled-components';

// import {
//   ErrorImageOverlay,
//   ErrorImageContainer,
//   ErrorImageText
// } from "./error-boundary.styles";

// const ErrorImageContainer = styled.div`
//   background-color: rgb(131, 217, 200); 
//   color: rgb(92, 119, 172);
// `;

const ErrorImage = ({ className, children }) => (
  <div className={className}>
    {children}
    {/* <img className="img-fluid" src="https://i.imgur.com/A040Lxr.png"></img> */}
  </div>
);

const ErrorImageContainer = styled(ErrorImage)`
  background-color: rgb(131, 217, 200); 
  color: rgb(92, 119, 172);
`;

class ErrorBoundary extends React.Component {
  constructor() {
    super();

    this.state = {
      hasErrored: false
    };
  }

  static getDerivedStateFromError(error) {
    // process the error here
    return { hasErrored: true };
  }

  componentDidCatch(error, info) {
    console.log(error);
  }

  render() {
    if (this.state.hasErrored) {
      return (
        <div className="col-md-12 col-lg-9 col-xl-6 my-1 mx-auto pt-4">
          {/* <div className="alert alert-danger" role="alert">
            {`Some error occured`}
          </div> */}
          <ErrorImageContainer className="mx-auto d-block">
          <div className="col-sm-6 mx-auto d-block">
            <img className="img-fluid" src="https://i.imgur.com/A040Lxr.png" alt="404"></img>
          </div>
          <div className="text-center py-4">
            <h3>Something went wrong</h3>
          </div>
          </ErrorImageContainer>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;