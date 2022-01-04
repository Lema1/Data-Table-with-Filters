import { useState } from "react";

export const FilterGlobal = (props) => {
  const { keyword, setFilter, data, ...rest } = props;
  return (
    <div className="filter__input-container global">
      <input
        type="text"
        className="filter__input-global"
        placeholder={`Buscar ${data} registros...`}
        value={keyword || ""}
        onChange={(e) => setFilter(e.target.value || undefined)}
        {...rest}
      />
    </div>
  );
};

export const FilterText = (props) => {
  const { title, target, handlerFilterKeyword, ...rest } = props;

  return (
    <div className="filter__input-container text">
      <span className="filter__input-title">{title}</span>
      <input
        type="text"
        className="filter__input-text"
        onChange={(e) => handlerFilterKeyword(e.target.value, target, "text")}
        {...rest}
      />
    </div>
  );
};

export const FilterSelect = (props) => {
  const { title, target, preFilterData, handlerFilterKeyword, ...rest } = props;
  const options = [...new Set(preFilterData.map((item) => item[target]))];
  const [filterValue, setFilterValue] = useState();

  return (
    <div className="filter__input-container select">
      <span className="filter__input-title">{title}</span>
      <select
        className="filter__input-select"
        value={filterValue}
        onChange={(e) => handlerFilterKeyword(e.target.value, target, "select")}
        {...rest}
      >
        <option value="">Todos</option>
        {options.map((option, index) => {
          return (
            <option key={index} value={option}>
              {`${option}`}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export const FilterCheckBox = (props) => {
  const { title, target, preFilterData, handlerFilterKeyword, ...rest } = props;

  const options = [...new Set(preFilterData.map((item) => item[target]))];
  const [activeFilter, setActiveFilter] = useState([]);

  const handlerSearch = (value) => {
    let activeOptions;
    if (activeFilter.includes(value)) {
      const filterIndex = activeFilter.indexOf(value);
      const newFilter = [...activeFilter];
      newFilter.splice(filterIndex, 1);
      activeOptions = newFilter;
      setActiveFilter(newFilter);
    } else {
      activeFilter.push(value);
      activeOptions = [...activeFilter];
      setActiveFilter([...activeFilter]);
    }
    handlerFilterKeyword(activeOptions, target, "checkbox");
  };

  return (
    <div className="filter__input-container checkbox">
      <span className="filter__input-title">{title}</span>
      {options.map((item, index) => {
        return (
          <label key={index} className="filter__input-label">
            {target === "userId" ? `Usuario ${item}` : item}
            <input
              id={item}
              type="checkbox"
              className="filter__input-checkbox"
              defaultChecked={activeFilter.includes(item)}
              onClick={(e) => handlerSearch(e.target.id)}
            />
            <span className="checkmark"></span>
          </label>
        );
      })}
    </div>
  );
};
