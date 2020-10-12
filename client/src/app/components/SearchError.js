import React from 'react';
import { connect } from 'react-redux';

class SearchError extends React.Component {
  render() {
    const { message } = this.props.errors

    return (
      (message ? (<div className="row">
        <div className="col-md-12 col-lg-9 col-xl-6 my-1 mx-auto ">
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        </div>
      </div>) : null)
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    errors: state.errors || {}
  }
}

export default connect(mapStateToProps)(SearchError);