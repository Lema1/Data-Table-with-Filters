# Tabla de Datos con Filtros

Permite crear tablas de dato dinamicas, controlando las cabezeras
y a que datos acceder. Ademas de poder crear filtros

## Tech Stack

**Client:** React, Next Js, Sass

## Installation

Primero instalar las dependencias

```bash
npm install
```

Luego ejecute el servidor de desarrollo:

```bash
npm run dev
```

## Usage/Examples

Coleccion de datos [Users - JSON Paceholder](https://jsonplaceholder.typicode.com/users)

Primero es crear la estructura de las columnas,
el nombre a mostrar la key para acceder a los datos y el tipo de filtro

```javascript
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
```

Lo siguiente es user el componente DataTable

```javascript
<DataTable
  name="Usuarios"
  columns={columns}
  collection={response}
  pagination={true}
  dataPerPage={4}
  globalFilter={true}
  filter={true}
  filterIndex={["name", "email", "address.city", "company.name"]}
/>
```
