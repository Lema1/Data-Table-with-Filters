import React, { useState, useEffect } from "react";

const Pagination = (props) => {
  const {
    itemPerPage,
    totalData,
    currentPage,
    previusPage,
    nextPage,
    goToPage,
  } = props;
  const [activePage, setActivePage] = useState(currentPage);
  const [showPages, setShowPages] = useState([]);

  let pageNumbers = []; //GUARDA LA LISTA DE NUMEROS DE PAGINA
  for (let x = 1; x <= Math.ceil(totalData / itemPerPage); x++) {
    pageNumbers.push(x);
  }

  const pagesShow = () => {
    let beforePage = currentPage - 1;
    let afterPage = currentPage + 1;
    let pages = [];
    for (let pageLength = beforePage; pageLength <= afterPage; pageLength++) {
      if (pageLength > pageNumbers.length) continue;
      if (pageLength == 0) pageLength++;
      pages.push(pageLength);
    }
    setShowPages(pages);
  };
  useEffect(() => {
    pagesShow();
  }, [currentPage]);

  return (
    <div className="pagination">
      <ul className="pagination__container">
        <li
          className={`pagination__item arrow ${currentPage == 1 && `disable`}`}
          onClick={() => {
            previusPage(pageNumbers.length);
            setActivePage(currentPage - 1);
          }}
        >
          <span className={`pagination__arrow`}>{"<"}</span>
        </li>
        {currentPage > 2 && (
          <li
            className={`pagination__item`}
            onClick={(e) => {
              goToPage(1);
              setActivePage(1);
            }}
          >
            <span className="pagination__number">{1}</span>
          </li>
        )}
        {currentPage > 3 && (
          <li className={`pagination__item dots`}>
            <span className="pagination__dots">...</span>
          </li>
        )}
        {showPages.map((number) => {
          return (
            <li
              key={number}
              className={`pagination__item ${activePage == number && `active`}`}
              onClick={(e) => {
                goToPage(number);
                setActivePage(number);
              }}
            >
              <span key={number} className="pagination__number">
                {number}
              </span>
            </li>
          );
        })}
        {currentPage < pageNumbers.length - 1 && (
          <React.Fragment>
            {currentPage < pageNumbers.length - 2 && (
              <li className={`pagination__item dots`}>
                <span className="pagination__dots">...</span>
              </li>
            )}
            <li
              className={`pagination__item`}
              onClick={() => goToPage(pageNumbers.length)}
            >
              <span className="pagination__number">{pageNumbers.length}</span>
            </li>
          </React.Fragment>
        )}
        <li
          className={`pagination__item arrow ${
            currentPage == pageNumbers.length && `disable`
          }`}
          onClick={() => {
            nextPage(pageNumbers.length);
            setActivePage(currentPage + 1);
          }}
        >
          <span className="pagination__arrow">{">"}</span>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
