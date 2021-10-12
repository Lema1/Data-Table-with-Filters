import Layout from '../components/Layout';
import axios from 'axios';
import DataTable from '../components/table/DataTable';

const Home = (props) => {
  const {albums} = props;
  const columns = [
    {
      Header: 'Id',
      key: 'id',
    },
    {
      Header: 'Usuario',
      key: 'userId',
    },
    {
      Header: 'Titulo',
      key: 'title',
    },
  ];

  return <Layout>
    <div className="table container">
      <DataTable 
          name="Albums"
          columns={columns}
          collection={albums}
          filter={true}
          globalFilter={true}
          filterFields={['title', 'userId']}
      />
    </div>
  </Layout>
}

export const getStaticProps = async () =>{
  const albums = await axios.get('https://jsonplaceholder.typicode.com/albums')
  
  return {props: {
    albums: albums.data
  }}
}

export default Home