import { Fragment, useState, useEffect } from "react";

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
  const { title, target, setData, data, preFilterData, ...rest } = props;
  let filterData;
  const handdlerSearch = (value) => {
    if (value) {
      filterData = data.filter((item) => {
        if (item[target].toString().toLowerCase().includes(value.toLowerCase()))
          return true;
      });
      return setData(filterData);
    }
    return setData(preFilterData);
  };
  return (
    <div className="filter__input-container text">
      <span className="filter__input-title">{title}</span>
      <input
        type="text"
        className="filter__input-text"
        onChange={(e) => handdlerSearch(e.target.value)}
        {...rest}
      />
    </div>
  );
};

export const FilterSelect = (props) => {
  const { title, target, setData, data, preFilterData, ...rest } = props;
  const options = [...new Set(preFilterData.map((item) => item[target]))];
  const [filterValue, setFilterValue] = useState();
  let filterData;

  const handlerSearch = (value) => {
    if (value) {
      filterData = preFilterData.filter((item) => {
        if (item[target].toString().toLowerCase().includes(value.toLowerCase()))
          return true;
      });
      setFilterValue(value);
      return setData(filterData);
    }
    setFilterValue();
    return setData(preFilterData);
  };
  return (
    <div className="filter__input-container select">
      <span className="filter__input-title">{title}</span>
      <select
        className="filter__input-select"
        value={filterValue}
        onChange={(e) => handlerSearch(e.target.value)}
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
  const { title, target, setData, data, preFilterData, ...rest } = props;
  const options = [...new Set(preFilterData.map((item) => item[target]))];
  const [activeFilter, setActiveFilter] = useState([]);
  let filterData;

  const handlerSearch = (value) => {
    if (activeFilter.includes(value)) {
      const filterIndex = activeFilter.indexOf(value);
      const newFilter = [...activeFilter];
      newFilter.splice(filterIndex, 1);
      setActiveFilter(newFilter);
    } else {
      activeFilter.push(value);
      setActiveFilter([...activeFilter]);
    }
  };

  function filter() {
    if (activeFilter.length == 0) {
      setData(preFilterData);
    } else {
      filterData = preFilterData.filter((item) => {
        for (var key in activeFilter) {
          if (
            !item[target] === undefined ||
            item[target].toString().toLowerCase() ===
              activeFilter[key].toLowerCase()
          )
            return true;
        }
      });
      setData(filterData);
    }
  }

  useEffect(() => {
    filter();
  }, [activeFilter]);

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
