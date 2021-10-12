import React from 'react'

const Pagination = (props) => {
    const {itemPerPage, totalData, previusPage, nextPage, goToPage} = props
    let pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalData / itemPerPage); i++) {
        pageNumbers.push(i)
        
    }
    return (
        <div className="pagination">
            <nav className="pagination__container">
                <li><span className="pagination__first-page" onClick={()=>{goToPage(1)}}>{'<<<'}</span></li>
                <li><span className="pagination__previus-page" onClick={()=>{previusPage(pageNumbers.length)}}>{'<'}</span></li>
                {pageNumbers.map(number => {
                    return <li key={number} className="">
                        <span className="pagination__number" onClick={() => goToPage(number)}>{number}</span>
                    </li>
                })}
                <li><span className="pagination__next-page" onClick={()=>{nextPage(pageNumbers.length)}}>{'>'}</span></li>
                <li><span className="pagination__last-page" onClick={()=>{goToPage(pageNumbers.length)}}>{'>>>'}</span></li>
            </nav>
        </div>
    )
}

export default Pagination
