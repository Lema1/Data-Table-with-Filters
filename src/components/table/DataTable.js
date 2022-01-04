import { Fragment } from "react";
import { useState, useEffect } from "react";
import { FilterGlobal } from "./FilterInput";
import Pagination from "./Pagination";
import Filter from "./Filter";

/*== FUNCION DE CONSTRUCCION DE DATA ==*/
export const constructData = (collection, columns) => {
  let dataTemp = [];
  let keySplit;

  collection.map((item, index) => {
    dataTemp[index] = {};
    columns.map((col, key) => {
      keySplit = col.key.split(".");
      if (keySplit.length > 1) {
        let x;
        keySplit.forEach((element) => {
          if (!x) x = item[element];
          else x = x[element];
        });
        dataTemp[index][col.key] = x;
      } else {
        dataTemp[index][col.key] = item[col.key];
      }
    });
  });
  return dataTemp;
};

/*== FUNCION DE CONSTRUCCION DE FILTROS  ==*/
export const constructFilterFields = (filterIndex) => {
  let dataTemp = [];

  filterIndex.map((item, index) => {
    dataTemp[item] = "";
  });

  return dataTemp;
};

const orderBy = (data, direction, target) => {
  if (direction === "asc")
    return data.sort((a, b) => (a[target] > b[target] ? 1 : -1));
  if (direction === "desc")
    return data.sort((a, b) => (a[target] > b[target] ? -1 : 1));
};

const SortArrow = ({ direction }) => {
  if (!direction) {
    return <></>;
  }
  if (direction === "desc") return <div>🔽</div>;
  else return <div>🔼</div>;
};

export const searchGlobal = (data, fields, keyword) => {
  let filterData;
  if (keyword) {
    filterData = data.filter((item) => {
      for (var key in fields) {
        if (
          !item[fields[key]] === undefined ||
          item[fields[key]]
            .toString()
            .toLowerCase()
            .includes(keyword.toLowerCase())
        )
          return true;
      }
    });
    return filterData;
  }
  return data;
};

const DataTable = (props) => {
  const {
    name,
    columns,
    collection,
    pagination,
    dataPerPage,
    globalFilter,
    filter,
    filterIndex,
  } = props;

  /*== STATE DE DATA DE FILTROS ==*/
  const [preFilterData, setPreFilterData] = useState([]); //STATE DE TODA LOS ITEMS
  const [data, setData] = useState([]); // STATE QUE ALMACENA LA DATA SEGUN CAMBIOS EN FILTROS
  const [filterFields, setFilterFields] = useState([]);

  const [globalKeyword, setGlobalKeyword] = useState(""); // STATE DE FILTRO GLOBAL
  const [openFilter, setOpenFilter] = useState(false);

  /*== STATE DE ALMACENAMIENTO PARA ORDENAR TABLA ==*/
  const [orderDirection, setOrderDirection] = useState();
  const [orderValue, setOrderValue] = useState();

  /*== STATE DE PAGINACION ==*/
  const [currentPage, setCurrentPage] = useState(1); //STATE DE PAGINA ACTUAL
  const [itemPerPage, setItemPerPage] = useState(dataPerPage ? dataPerPage : 5); //STATE DE ITEMS POR PAGINA

  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  let currentItem = pagination
    ? data.slice(indexOfFirstItem, indexOfLastItem)
    : data;

  /*== FUNCION PARA PAGINACION ==*/
  const previusPage = (number) => {
    if (currentPage == 1) return false;
    if (currentPage) setCurrentPage(currentPage - 1);
  };
  const nextPage = (number) => {
    if (currentPage + 1 >= number) setCurrentPage(number);
    else setCurrentPage(currentPage + 1);
  };
  const goToPage = (number) => {
    setCurrentPage(number);
  };

  /*== FUNCIONE PARA CAMBIAR LA DIRECCION DEL ORDEN ==*/
  const setValueAndDirection = (value) => {
    changeDirection();
    setOrderValue(value);
    orderBy(data, orderDirection, orderValue);
    function changeDirection() {
      if (!orderDirection) setOrderDirection("desc");
      else if (orderDirection === "desc") setOrderDirection("asc");
      else setOrderDirection(null);
    }
  };

  //FUNCTION GLOBAL FILTER TEXT
  const handlerGlobalSearch = (keyword) => {
    let resultData = searchGlobal(collection, filterIndex, keyword);
    setGlobalKeyword(keyword);
    setData(constructData(resultData, columns));
    setCurrentPage(1);
  };

  //FUNCION QUE CONTROLA LOS CAMBIOS EN LOS FILTROS
  const handlerFilterKeyword = (keyword, index, type) => {
    let newArr = filterFields;

    newArr[index] = { keyword: keyword, type: type };
    setFilterFields(newArr);
    handlerFilter();
  };

  const handlerFilter = () => {
    let filterData = preFilterData;

    Object.keys(filterFields).map((index) => {
      if (filterFields[index]) {
        if (filterFields[index].type === "checkbox") {
          if (filterFields[index].keyword.length == 0) {
            return false;
          } else {
            filterData = filterData.filter((item) => {
              for (var key in filterFields[index].keyword) {
                if (
                  !item[index] === undefined ||
                  item[index].toString().toLowerCase() ===
                    filterFields[index].keyword[key].toLowerCase()
                )
                  return true;
              }
            });
          }
        } else {
          filterData = filterData.filter((item) => {
            if (
              item[index]
                .toString()
                .toLowerCase()
                .includes(filterFields[index].keyword.toLowerCase())
            )
              return true;
          });
        }
      }
    });

    if (filterData) {
      setData(filterData);
    } else {
      setData(preFilterData);
    }
  };

  useEffect(() => {
    let resultData = constructData(collection, columns);
    setData(resultData);
    setPreFilterData(resultData);

    if (filterIndex) {
      let resultFilterField = constructFilterFields(filterIndex);
      setFilterFields(resultFilterField);
    }

    if (pagination) {
      currentItem = resultData.slice(indexOfFirstItem, indexOfLastItem);
    } else {
      currentItem = resultData;
    }
  }, []);

  return (
    <div className="data-table">
      <div className="data-table__actions">
        <div className="data-table__filter global">
          {globalFilter && (
            <FilterGlobal
              keyword={globalKeyword}
              setFilter={handlerGlobalSearch}
              data={data.length}
            />
          )}
        </div>
        <div className="data-table__item-per-page">
          <select
            value={itemPerPage}
            onChange={(e) => {
              setItemPerPage(Number(e.target.value));
            }}
          >
            {[5, 10, 20, 30, 40, 50].map((itemPerPage) => (
              <option key={itemPerPage} value={itemPerPage}>
                Show {itemPerPage}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filter && (
        <Fragment>
          <div
            className="data-table__filter btn"
            onClick={() => setOpenFilter(!openFilter)}
          >
            <span className="data-table__filter-open">Filtros</span>
          </div>
          <Filter
            state={openFilter}
            setState={setOpenFilter}
            data={data}
            setData={setData}
            columns={columns}
            collection={collection}
            preFilterData={preFilterData}
            handlerFilterKeyword={handlerFilterKeyword}
          />
        </Fragment>
      )}
      <div className="data-table__table-container">
        <table className="data-table__table">
          <thead className="data-table__header">
            <tr>
              {columns.map((item, index) => {
                return (
                  <th
                    key={index}
                    onClick={() => setValueAndDirection(item["key"])}
                  >
                    {item["Header"]}
                    {/* condicianr mejor la flecha */}
                    {/* <SortArrow direction={orderDirection}/> */}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="data-table__body">
            {currentItem.map((item, index) => {
              return (
                <tr className="data-table__row" key={index}>
                  {columns.map((col, key) => {
                    return (
                      <td className="data-table__col" key={key}>
                        {`${item[col["key"]]}`}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="data-table__pagination">
        {pagination && (
          <Pagination
            itemPerPage={itemPerPage}
            totalData={data.length}
            currentPage={currentPage}
            previusPage={previusPage}
            nextPage={nextPage}
            goToPage={goToPage}
          />
        )}
      </div>
    </div>
  );
};

export default DataTable;
