import Layout from '../components/Layout';
import axios from 'axios';
import DataTable from '../components/table/DataTable';

const Users = (props) => {
    const {users} = props;
    const columns = [
        {
          Header: 'Id',
          key: 'id',
        },
        {
          Header: 'Nombre',
          key: 'name',
        },
        {
          Header: 'E-mail',
          key: 'email',
        },
        {
          Header: 'Ciudad',
          key: 'address.city',
        },
        {
          Header: 'Compañia',
          key: 'company.name',
      }
    ];
    return <Layout>
        <DataTable 
          name="Usuarios"
          columns={columns}
          collection={users}
          filter={true}
          globalFilter={true}
          filterFields={['name', 'email',]}
          pagination={true}
        />
    </Layout>
}

export const getStaticProps = async () =>{
    const users = await axios.get('https://jsonplaceholder.typicode.com/users')
    
    return {props: {
      users: users.data
    }}
  }

export default Users
