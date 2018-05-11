import React from 'react';
import PropTypes from 'prop-types';


const Pagination = ({
  next, previous, currentPage, currentPageUrl, totalPages, showPrevious, showNext
}) => (
  <div className="pagination text-center d-flex justify-content-center">

    <button
      className={!previous ? 'page-of mr-auto' : 'page z-depth-1 mr-auto hoverable'}
      disabled={!previous}
      onClick={showPrevious}>
      {!previous ? 'First' : 'Previous'}
    </button>

    <span
      className="page active"
      href={currentPageUrl}>
      {currentPage}
    </span>

    <span className="page-of">of</span>

    <span className="page active">{totalPages}</span>

    <button
      className={!next ? 'page-of ml-auto' : 'page z-depth-1 ml-auto hoverable'}
      disabled={!next}
      onClick={showNext}>
      {!next ? 'Last' : 'Next'}
    </button>
  </div>
);

Pagination.propTypes = {
  next: PropTypes.string,
  previous: PropTypes.string,
  currentPage: PropTypes.number.isRequired,
  currentPageUrl: PropTypes.string.isRequired,
  totalPages: PropTypes.number.isRequired,
  showNext: PropTypes.func.isRequired,
  showPrevious: PropTypes.func.isRequired
};

export default Pagination;
