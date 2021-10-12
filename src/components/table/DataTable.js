import React from 'react'
import { useState, useEffect } from 'react'
import { FilterGlobal, } from './FilterInput'
import Pagination from './Pagination'

const constructData = (collection, columns) =>{ // FUNCION DE CONTRUCCION DE DATA
    let dataTemp = []
    let keySplit
    
    collection.map((item, index) =>{
        dataTemp[index] = {}
        columns.map((col,key) =>{
            keySplit = col.key.split(".")
            if (keySplit.length > 1) {
                let x
                keySplit.forEach(element => {
                    if(!x) x = item[element]
                    else x = x[element]
                });
                dataTemp[index][col.key] = x
            } else {
                dataTemp[index][col.key] = item[col.key]
            }
        })
    })
    return dataTemp;
}

const orderBy = (data, direction, target) =>{
    if (direction === 'asc') 
        return data.sort((a, b) => a[target] > b[target] ? 1 : -1);
    if (direction === 'desc') 
        return data.sort((a, b) => a[target] > b[target] ? -1 : 1);
}

const SortArrow = ({direction}) =>{
    // console.log(direction);
    if(!direction){
        return <></>
    }
    if(direction === "desc") return <div>🔽</div>
    else return <div>🔼</div>
}

export const searchGlobal = (data, fields, keyword) =>{
    let filterData
    if(keyword){
        filterData = data.filter((item) => {
            for (var key in fields) {
              if (!item[fields[key]] === undefined || item[fields[key]].toString().toLowerCase().includes(keyword.toLowerCase()))
                return true;
            }
          });
       return filterData;
    }
    return data;    
}

const DataTable = (props) => {
    const {name, columns, collection, filter, globalFilter, filterFields, pagination, dataPerPage} = props
    const [data, setData] = useState([]) // STATE QUE ALMACENA LA DATA SEGUN CAMBIOS EN FILTROS
    
    /*== STATE DE ALMACENAMIENTO PARA ORDENAR TABLA ==*/
    const [orderDirection, setOrderDirection] = useState()
    const [orderValue, setOrderValue] = useState()

    const [globalKeyword, setGlobalKeyword] = useState("")// STATE DE FILTRO GLOBAL

    /*== STATE DE PAGINACION ==*/
    const [currentPage, setCurrentPage] = useState(1) //STATE DE PAGINA ACTUAL
    const [itemPerPage, setItemPerPage] = useState(dataPerPage ? dataPerPage : 5) //STATE DE CUANTOS ITEMS POR PAGINA

    const indexOfLastItem = currentPage * itemPerPage
    const indexOfFirstItem = indexOfLastItem - itemPerPage
    let currentItem = pagination ? data.slice(indexOfFirstItem, indexOfLastItem) : data

    /*== FUNCION PARA PAGINACION ==*/
    const previusPage = (number) =>{
        if(currentPage == 1) return false
        if(currentPage) setCurrentPage(currentPage-1)
    }
    const nextPage = (number) =>{
        if (currentPage + 1 >= number) setCurrentPage(number)
        else setCurrentPage(currentPage+1)
    }
    const goToPage = (number) => {
        setCurrentPage(number);
    }
    
    /*== FUNCIONE PARA CAMBIAR LA DIRECCION DEL ORDEN ==*/
    const setValueAndDirection = (value) =>{
        changeDirection();
        setOrderValue(value);
        orderBy(data, orderDirection, orderValue);
        function changeDirection() {
            if(!orderDirection) setOrderDirection('desc');
            else if (orderDirection === 'desc') setOrderDirection('asc');
            else setOrderDirection(null);
        }
    }

    //FUNCTION GLOBAL FILTER TEXT
    const handlerGlobalSearch = (keyword) =>{
        let resultData = searchGlobal(collection, filterFields, keyword);
        setGlobalKeyword(keyword);
        setData(constructData(resultData, columns));
        setCurrentPage(1)
    }

    useEffect(() => {
        let resultData = constructData(collection, columns);
        setData(resultData);
        if(pagination){
            currentItem = resultData.slice(indexOfFirstItem, indexOfLastItem)
        }
        else{
            currentItem = resultData
        }
        
    }, [])

    return (
        <div className="dataTable">
            <div className="dataTable__records">
                <div className="dataTable__records count">{`Encontrados ${data.length} ${name}`}</div>
            </div>
            <div className="dataTable__filter global">
                {globalFilter && <FilterGlobal keyword={globalKeyword} setFilter={handlerGlobalSearch} data={data.length}  />}
            </div>
            <div className="dataTable__pagination item-per-page">
                <select value={itemPerPage} onChange={(e) => { setItemPerPage(Number(e.target.value)); }}>
                {[5, 10, 20, 30, 40, 50].map((itemPerPage) => (
                    <option key={itemPerPage} value={itemPerPage}>
                    Show {itemPerPage}
                    </option>
                ))}
                </select>
            </div>
            <div className="dataTable__table">
                <table className="dataTable__table table">
                    <thead className="dataTable__table header">
                        <tr>
                            {columns.map((item, index) => {
                                return (
                                    <th key={index} onClick={() => setValueAndDirection(item['key'])}>
                                        {item['Header']}
                                        {/* condicianr mejor la flecha */}
                                        {/* <SortArrow direction={orderDirection}/> */}
                                    </th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody className="dataTable__table body">
                        {currentItem.map((item, index) => {
                            return <tr className="dataTable__table row" key={index}>
                                {columns.map((col, key)=>{
                                    return (
                                        <td className="dataTable__table col" key={key}>
                                            {`${item[col['key']]}`}
                                        </td>
                                    )
                                })}
                            </tr>
                        })}
                    </tbody>
                    {/* <tfoot>
                        <tr>
                            <td><span>tfoot</span></td>
                        </tr>
                    </tfoot> */}
                </table>
            </div>
            <div className="dataTable__pagination">
                {pagination && 
                    <Pagination 
                        itemPerPage={itemPerPage}
                        totalData={data.length}
                        previusPage={previusPage}
                        nextPage={nextPage}
                        goToPage={goToPage} 
                    />
                }
            </div>
        </div>
    )
}

export default DataTable
