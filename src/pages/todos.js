import axios from "axios";
import DataTable from "../components/table/DataTable";

const Todos = (props) => {
  const { response } = props;
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
        collection={response}
        filter={true}
        globalFilter={true}
        filterIndex={["userId", "title", "completed"]}
        pagination={true}
        dataPerPage={10}
      />
    </div>
  );
};

export const getStaticProps = async () => {
  const todos = await axios.get("https://jsonplaceholder.typicode.com/todos");
  return {
    props: {
      response: todos.data,
    },
  };
};

export default Todos;
