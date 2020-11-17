import React from "react";

class Pagination extends React.Component {
  renderPagination() {
    let index = 0;
    const renderedPagination = [];

    if (this.props.currentPage !== 1) {
      renderedPagination.push(
        <li key={++index} className="page-item">
          <button
            className="page-link"
            onClick={() => this.props.callback(this.props.currentPage - 1)}
            tabIndex={-1}
          >
            Previous
          </button>
        </li>
      );
    } else {
      renderedPagination.push(
        <li key={++index} className="page-item disabled">
          <button className="page-link" tabIndex={-1}>
            Previous
          </button>
        </li>
      );
    }

    if (this.props.totalCount <= 6) {
      for (let i = 1; i <= this.props.totalCount; i++) {
        renderedPagination.push(
          <li
            key={++index}
            className={`page-item  ${
              this.props.currentPage === i ? "active" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => this.props.callback(i)}
            >
              {i}
            </button>
          </li>
        );
      }
    } else {
      renderedPagination.push(
        <li
          key={++index}
          className={`page-item  ${
            this.props.currentPage === 1 ? "active" : ""
          }`}
        >
          <button className="page-link" onClick={() => this.props.callback(1)}>
            1
          </button>
        </li>
      );
      if (this.props.currentPage > 3) {
        renderedPagination.push(
          <li key={++index} className="page-item disabled">
            <button className="page-link">...</button>
          </li>
        );
      }
      if (this.props.currentPage === this.props.totalCount) {
        renderedPagination.push(
          <li key={++index} className="page-item">
            <button
              className="page-link"
              onClick={() => this.props.callback(this.props.currentPage - 2)}
            >
              {this.props.currentPage - 2}
            </button>
          </li>
        );
      }
      if (this.props.currentPage > 2) {
        renderedPagination.push(
          <li key={++index} className="page-item">
            <button
              className="page-link"
              onClick={() => this.props.callback(this.props.currentPage - 1)}
            >
              {this.props.currentPage - 1}
            </button>
          </li>
        );
      }
      if (
        this.props.currentPage !== 1 &&
        this.props.currentPage !== this.props.totalCount
      ) {
        renderedPagination.push(
          <li key={++index} className="page-item active">
            <button
              className="page-link"
              onClick={() => this.props.callback(this.props.currentPage)}
            >
              {this.props.currentPage}
            </button>
          </li>
        );
      }
      if (this.props.currentPage < this.props.totalCount - 1) {
        renderedPagination.push(
          <li key={++index} className="page-item">
            <button
              className="page-link"
              onClick={() => this.props.callback(this.props.currentPage + 1)}
            >
              {this.props.currentPage + 1}
            </button>
          </li>
        );
      }
      if (this.props.currentPage === 1) {
        renderedPagination.push(
          <li key={++index} className="page-item">
            <button
              className="page-link"
              onClick={() => this.props.callback(this.props.currentPage + 2)}
            >
              {this.props.currentPage + 2}
            </button>
          </li>
        );
      }
      if (this.props.currentPage < this.props.totalCount - 2) {
        renderedPagination.push(
          <li key={++index} className="page-item disabled">
            <button className="page-link">...</button>
          </li>
        );
      }
      renderedPagination.push(
        <li
          key={++index}
          className={`page-item  ${
            this.props.currentPage === this.props.totalCount ? "active" : ""
          }`}
        >
          <button
            className="page-link"
            onClick={() => this.props.callback(this.props.totalCount)}
          >
            {this.props.totalCount}
          </button>
        </li>
      );
    }

    if (this.props.currentPage === this.props.totalCount) {
      renderedPagination.push(
        <li key={++index} className="page-item disabled">
          <button className="page-link">Next</button>
        </li>
      );
    } else {
      renderedPagination.push(
        <li key={++index} className="page-item">
          <button
            className="page-link"
            onClick={() => this.props.callback(this.props.currentPage + 1)}
          >
            Next
          </button>
        </li>
      );
    }

    return renderedPagination;
  }
  render() {
    return (
      <ul
        className="pagination justify-content-center"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        {this.renderPagination()}
      </ul>
    );
  }
}

export default Pagination;
