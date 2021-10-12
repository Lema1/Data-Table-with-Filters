export const FilterGlobal = (props) =>{
    const {keyword, setFilter, data, ...rest} = props
    return <div>
        <input 
            type="text"
            className="dataTable__filter input"
            placeholder={`Buscar ${data} registros...`}
            value={keyword || ""}
            onChange={(e) => setFilter(e.target.value || undefined)}
            {...rest}
        />
    </div>
}

export const FilterText = ({...rest}) =>{
    console.log(rest);
    return <input {...rest}/>
}

export const FilterSelect = ({...rest}) =>{
    return <input {...rest}/>
}

export const FilterDate = ({...rest}) =>{
    return <input {...rest}/>
}

export const FilterCheckBox = ({...rest}) =>{
    return <input {...rest}/>
}

// function SelectColumnFilter({
//     column: { filterValue, setFilter, preFilteredRows, id },
//     }) {
//     // Calculate the options for filtering
//     // using the preFilteredRows
//     const options = useMemo(() => {
//       const options = new Set()
//       preFilteredRows.forEach(row => {
//         options.add(row.values[id])
//       })
//       return [...options.values()]
//     }, [id, preFilteredRows])
  
//     // Render a multi-select box
//     return (
//       <select
//         value={filterValue}
//         onChange={e => {
//           setFilter(e.target.value || undefined)
//         }}
//       >
//         <option value="">Todos</option>
//         {options.map((option, i) => (
//           <option key={i} value={option}>
//             {option}
//           </option>
//         ))}
//       </select>
//     )
//   }