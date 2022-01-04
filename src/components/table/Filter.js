import React, { Fragment } from "react";
import { FilterText, FilterSelect, FilterCheckBox } from "./FilterInput";

const Filter = (props) => {
  const {
    state,
    setState,
    data,
    setData,
    columns,
    preFilterData,
    handlerFilterKeyword,
  } = props;
  return (
    <div className={`filter ${state ? "show" : "hide"}`}>
      <div className="filter__header">
        <div className="filter__header-close" onClick={() => setState(!state)}>
          X
        </div>
        <div className="filter__header-title">
          <span>Filtros</span>
        </div>
      </div>
      <div className="filter__container">
        {columns.map((item, index) => {
          if (item.filterType) {
            if (item.filterType === "text") {
              return (
                <Fragment key={index}>
                  <FilterText
                    title={item.Header}
                    target={item.key}
                    placeholder={`Ej: ${
                      item.key === "name"
                        ? "Alvaro"
                        : item.key === "title"
                        ? "Lorem"
                        : "alvaro@test.cl"
                    }`}
                    handlerFilterKeyword={handlerFilterKeyword}
                  />
                </Fragment>
              );
            }
            if (item.filterType === "select") {
              return (
                <Fragment key={index}>
                  <FilterSelect
                    title={item.Header}
                    target={item.key}
                    preFilterData={preFilterData}
                    handlerFilterKeyword={handlerFilterKeyword}
                  />
                </Fragment>
              );
            }
            if (item.filterType === "checkbox") {
              return (
                <Fragment key={index}>
                  <FilterCheckBox
                    title={item.Header}
                    target={item.key}
                    preFilterData={preFilterData}
                    handlerFilterKeyword={handlerFilterKeyword}
                  />
                </Fragment>
              );
            }
            if (item.filterType === "date") {
              return (
                <Fragment key={index}>
                  <FilterDate
                    title={item.Header}
                    target={item.key}
                    setData={setData}
                    data={data}
                    preFilterData={preFilterData}
                  />
                </Fragment>
              );
            }
          }
        })}
      </div>
    </div>
  );
};

export default Filter;
