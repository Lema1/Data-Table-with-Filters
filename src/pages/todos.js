import Layout from '../components/Layout';
import axios from 'axios'
import DataTable from '../components/table/DataTable';

const Todos = (props) => {
    const {todos} = props;
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
        {
          Header: 'Completado',
          key: 'completed',
        },
    ];
    return <Layout>
    <DataTable 
      name="Usuarios"
      columns={columns}
      collection={todos}
      filter={true}
      globalFilter={true}
      filterFields={['userId', 'title', 'completed']}
      pagination={true}
      dataPerPage={20}
    />
</Layout>
}

export const getStaticProps = async () =>{
    const todos = await axios.get('https://jsonplaceholder.typicode.com/todos')
    return {props: {
        todos: todos.data
      }}
}

export default Todos
