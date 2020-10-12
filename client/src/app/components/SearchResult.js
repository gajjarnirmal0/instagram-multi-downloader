import React from 'react';
import _ from 'lodash';
import copy from 'copy-to-clipboard';
import { connect } from 'react-redux';

class SearchResult extends React.Component {

  state = { copied: null };

  static getDerivedStateFromProps(nextProps, prevState) {
    // if downloads list is empty then copied = null
    if (nextProps.downloads.data.length === 0) {
      return ({ copied: null });
    }
    return null;
  }

  copyToClipboard = (e) => {

    const { downloads: { data } } = this.props;

    const links = [];

    data.forEach(linkValue => {
      const { downloadLink, loading } = linkValue;

      if (loading && !downloadLink) {
      }
      else {
        if (downloadLink !== null) {
          if (typeof (downloadLink) === "string") {
            links.push(downloadLink);
          }
          else if (typeof (downloadLink) === "object") {
            downloadLink.forEach(subLinkValue => {
              links.push(subLinkValue.value);
            });
          }
        }
      }
    });

    copy(links.join("\n"));
    this.setState({ copied: `${links.length} item(s) copied!` });

    // with dom
    // const textArea = document.createElement('textarea')
    // textArea.innerHtml = links
    // document.body.appendChild(textArea)
    // textArea.select()
    // document.execCommand('copy')
    // textArea.remove()

    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    e.target.focus();
  };

  renderLink = (linkValue) => {
    const { value, downloadLink, loading } = linkValue;

    if (loading && !downloadLink)
      return (
        <li className="list-group-item" key={value}>
          <div className="spinner-border text-secondary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </li>
      );

    else {
      if (downloadLink !== null) {
        if (typeof (downloadLink) === "string") {
          return (
            <li className="list-group-item" key={downloadLink}>
              <a href={downloadLink} target="_blank" rel="noopener noreferrer">{value}</a>
            </li>
          );
        }
        else if (typeof (downloadLink) === "object") {
          return (
            <li className="list-group-item" key={value}>
              {_.map(downloadLink, (subLinkValue) => (
                <React.Fragment key={subLinkValue.name}>
                  <div className="row">
                    <div className="col-md-12">
                      <a href={subLinkValue.value} target="_blank" rel="noopener noreferrer">{subLinkValue.name}</a>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </li>
          );
        }
      }
    }
    // linkValue.downloadLink ? <li className="list-group-item" key={linkValue.downloadLink}>
    //   <a href={linkValue.downloadLink}>{linkValue.downloadLink}</a>
    // </li> : null
  }

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
                  <ul className="list-group">
                    {_.map(data, value => this.renderLink(value))}
                  </ul>
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

export default connect(mapStateToProps)(SearchResult);