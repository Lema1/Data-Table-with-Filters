import axios from "axios";
import DataTable from "../components/table/DataTable";

const Home = (props) => {
  const { albums } = props;
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
        collection={albums}
        filter={true}
        globalFilter={true}
        filterFields={["title", "userId"]}
      />
    </div>
  );
};

export const getStaticProps = async () => {
  const albums = await axios.get("https://jsonplaceholder.typicode.com/albums");

  return {
    props: {
      albums: albums.data,
    },
  };
};

export default Home;
