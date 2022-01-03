import React, { Fragment } from "react";
import { FilterText, FilterSelect, FilterCheckBox } from "./FilterInput";

const Filter = (props) => {
  const { state, setState, data, setData, columns, preFilterData } = props;
  // console.log(props);

  return (
    <div className={`filter ${state ? "show" : "hide"}`}>
      <div className="filter__close" onClick={() => setState(!state)}>
        X
      </div>
      <div className="filter__title">
        <span>Filtros</span>
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
                    setData={setData}
                    data={data}
                    preFilterData={preFilterData}
                    placeholder={`Ej: ${
                      item.key === "name"
                        ? "Alvaro"
                        : item.key === "title"
                        ? "Lorem"
                        : "alvaro@test.cl"
                    }`}
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
                    setData={setData}
                    data={data}
                    preFilterData={preFilterData}
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
                    setData={setData}
                    data={data}
                    preFilterData={preFilterData}
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
