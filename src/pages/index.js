import axios from "axios";
import DataTable from "../components/table/DataTable";

const Home = (props) => {
  const { response } = props;
  const columns = [
    {
      Header: "Id",
      key: "id",
    },
    {
      Header: "Usuario",
      key: "userId",
    },
    {
      Header: "Titulo",
      key: "title",
    },
  ];

  return (
    <div className="container">
      <DataTable
        name="Albums"
        columns={columns}
        collection={response}
        pagination={false}
        globalFilter={true}
        filter={false}
      />
    </div>
  );
};

export const getStaticProps = async () => {
  const albums = await axios.get("https://jsonplaceholder.typicode.com/albums");

  return {
    props: {
      response: albums.data,
    },
  };
};

export default Home;
