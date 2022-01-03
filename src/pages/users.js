import axios from "axios";
import DataTable from "../components/table/DataTable";

const Users = (props) => {
  const { users } = props;
  const columns = [
    {
      Header: "Id",
      key: "id",
      filterType: null,
    },
    {
      Header: "Nombre",
      key: "name",
      filterType: "text",
    },
    {
      Header: "E-mail",
      key: "email",
      filterType: "text",
    },
    {
      Header: "Ciudad",
      key: "address.city",
      filterType: "select",
    },
    {
      Header: "Compañia",
      key: "company.name",
      filterType: "select",
    },
  ];
  return (
    <div className="container">
      <DataTable
        name="Usuarios"
        columns={columns}
        collection={users}
        filter={true}
        globalFilter={true}
        filterFields={["name", "email"]}
        pagination={true}
      />
    </div>
  );
};

export const getStaticProps = async () => {
  const users = await axios.get("https://jsonplaceholder.typicode.com/users");

  return {
    props: {
      users: users.data,
    },
  };
};

export default Users;
