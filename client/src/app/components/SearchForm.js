import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import {
  fetchData,
  clearData
} from "../actions/search.actions";

import { resetErrors } from "../actions/error.actions";

const defaultState = () => {
  return {
    form: {
      searchTerm: "",
      //       searchTerm: `https://www.instagram.com/p/CGJn6JuMIGm/
      // https://www.instagram.com/p/CGIxEaWD69G/
      // https://www.instagram.com/p/CFPn7r4FZ6F/?igshid=4on6bnb8e3pl`,
    },
    formSubmit: false,
    touched: {
      searchTerm: null
    },
  }
};

class SearchForm extends React.Component {

  state = defaultState();

  constructor(props) {
    super(props);

    this.searchFormRefs = {};
    this.notifyRef = null;
    const inputsList = defaultState().form;
    for (const inputKey in inputsList) {
      this.searchFormRefs[inputKey] = React.createRef();
    }
  }

  searchFormChange = (event) => {
    const { name: elementName, value: elementValue } = event.target;

    this.setState((state, props) => {
      let newState = { ...state };
      newState.form[elementName] = elementValue;
      newState.touched[elementName] = true;
      newState.formSubmit = false;
      return (newState);
    });
  }

  handleOnSubmit = (event) => {
    event.preventDefault();

    const { form } = this.state;
    const { loading, fetchData } = this.props;

    if (!loading) {

      this.setState((state, props) => {
        let newState = { ...state };

        newState.loading = true;
        newState.touched = _.mapValues(newState.touched, (value) => true);
        newState.formSubmit = true;

        return newState;
      }, () => {
        this.props.resetErrors();
        fetchData(form);
      });

    }
  }

  clearFormData = () => {
    this.setState((state, props) => {
      return defaultState();
    }, () => {
      this.props.clearData();
      this.props.resetErrors();
    })
  }

  render() {

    const {
      state: {
        form: {
          searchTerm
        }
      },
      searchFormChange,
      searchFormRefs,
      handleOnSubmit
    } = this;

    return (
      <React.Fragment>
        <form onSubmit={handleOnSubmit} method="post">
          <div className="row">
            <div className="col-md-12 col-lg-9 col-xl-6 my-1 mx-auto pt-4 text-center">
              <h1>Provide Instagram Link(s) </h1>
              <label className="sr-only">Search</label>
              <div className="input-group">
                <textarea
                  type="text"
                  className="form-control"
                  name="searchTerm"
                  placeholder="one link per line"
                  ref={searchFormRefs.searchTerm}
                  onChange={searchFormChange}
                  autoFocus={true}
                  value={searchTerm}
                  rows="5"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 col-lg-9 col-xl-6 my-1 mx-auto pt-1 text-center">
              <div className="row">
                <div className="col-sm-6">
                  <button className="btn btn-primary btn-block mx-auto">
                    <i className="fa fa-search" aria-hidden="true"></i> Search
                  </button>
                </div>
                <div className="col-sm-6 d-block d-sm-none py-2">
                </div>
                <div className="col-sm-6">
                  <button type="button" className="btn btn-danger btn-block mx-auto" onClick={this.clearFormData}>
                    <i className="fa fa-times" aria-hidden="true"></i> Clear
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

// const mapStateToProps = (state, ownProps) => {
//   return {
//     downloadData: state.data,
//     errors: state.errors || {}
//   }
// }

export default connect(null, {
  clearData,
  fetchData,
  resetErrors,
})(SearchForm);