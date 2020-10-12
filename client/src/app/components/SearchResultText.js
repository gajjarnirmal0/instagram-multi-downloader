import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

class SearchResultText extends React.Component {

  state = { copied: null };

  constructor(props) {
    super(props);

    this.searchResultTextRef = React.createRef();
  }

  copyToClipboard = (e) => {
    this.searchResultTextRef.current.select();
    document.execCommand('copy');
    this.setState({ copied: `${links.length} item(s) copied!` });

    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    e.target.focus();
    // this.setState({ copySuccess: 'Copied!' });
  };

  render() {

    const { downloads: { data } } = this.props;

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-12 col-lg-9 col-xl-6 mx-auto">
            {data.length ? (
              <div className="card bg-light mb-3">
                <div className="card-header">
                  Search Results
                  <div className="pull-right">
                    <div className="inline-block">
                      <div className="d-inline-block text-monospace small text-success">{this.state.copied}&nbsp;</div>
                      <button type="button" className="btn btn-sm btn-primary" onClick={this.copyToClipboard}>Copy</button>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <textarea className="text-monospace" rows="20" style={{ width: "100%" }} wrap="off" ref={this.searchResultTextRef} readOnly={true}
                    value={_.map(data, linkValue => {
                      const { downloadLink, loading } = linkValue;

                      if (!loading && downloadLink !== null) {
                        if (typeof (downloadLink) === "string") {
                          return downloadLink;
                        }
                        else if (typeof (downloadLink) === "object") {
                          return _.map(downloadLink, (subLinkValue) => subLinkValue.value).join("\n");
                        }
                      }
                    }).join("\n")}>
                  </textarea>
                </div>
              </div>

            ) : null}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    downloads: state.downloads,
    errors: state.errors || {}
  }
}

export default connect(mapStateToProps)(SearchResultText);