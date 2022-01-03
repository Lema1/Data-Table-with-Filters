import axios from "axios";
import DataTable from "../components/table/DataTable";

const Todos = (props) => {
  const { todos } = props;
  const columns = [
    {
      Header: "Id",
      key: "id",
      filterType: null,
    },
    {
      Header: "Usuario",
      key: "userId",
      filterType: "checkbox",
    },
    {
      Header: "Titulo",
      key: "title",
      filterType: "text",
    },
    {
      Header: "Completado",
      key: "completed",
      filterType: "select",
    },
  ];
  return (
    <div className="container">
      <DataTable
        name="Usuarios"
        columns={columns}
        collection={todos}
        filter={true}
        globalFilter={true}
        filterFields={["userId", "title", "completed"]}
        pagination={true}
        dataPerPage={5}
      />
    </div>
  );
};

export const getStaticProps = async () => {
  const todos = await axios.get("https://jsonplaceholder.typicode.com/todos");
  return {
    props: {
      todos: todos.data,
    },
  };
};

export default Todos;
