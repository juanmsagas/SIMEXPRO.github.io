/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {
  Button,
  ButtonBase,
  FormControl,
  Icon,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  Avatar,
} from "@mui/material";
import * as React from 'react';
import Stack from '@mui/material/Stack';
import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid'
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { DownOutlined } from '@ant-design/icons';
import { Badge, Dropdown, Space, Table } from 'antd';
import { keyBy } from 'lodash';


function ColoniasIndex() {
  const [searchText, setSearchText] = useState('');
  const [mostrarIndex, setmostrarIndex] = useState(true);
  const [mostrarAdd, setmostrarAdd] = useState(false);
  const [Eliminar, setEliminar] = useState(false);

  const [ciudad, setCiudad] = useState('');
  const [aldea, setAldea] = useState('');
  const [colonia, setColonia] = useState('');
  const [isCiudadValid, setIsCiudadValid] = useState(true);
  const [isAldeaValid, setIsAldeaValid] = useState(true);
  const [isColoniaValid, setIsColoniaValid] = useState(true);

  
  const handleGuardarClick = () => {
    let valid = true;
    if (ciudad.trim() === '') {
      setIsCiudadValid(false);
      valid = false;
    }
    if (aldea.trim() === '') {
      setIsAldeaValid(false);
      valid = false;
    }
    if (colonia.trim() == '') {
      setIsColoniaValid(false);

      valid = false;
    }
    if (valid) {
      // Your logic to save data when all fields are valid
      // console.log('Data saved!');
      // Reset the form
      setCiudad('');
      setAldea('');
      setColonia('');
    }
  };

  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  const [anchorEl, setAnchorEl] = useState({});

  const handleClick = (event, id) => {
    setAnchorEl(prevState => ({
      ...prevState,
      [id]: event.currentTarget,
    }));
  };

  const handleClose = (id) => {
    setAnchorEl(prevState => ({
      ...prevState,
      [id]: null,
    }));
  };

  const handleEdit = (id) => {
    console.log(id);
    // Lógica para manejar la edición de la fila con el ID proporcionado
    handleClose(id);
  };

  const handleDetails = (id) => {
    // Lógica para manejar la visualización de detalles de la fila con el ID proporcionado
    handleClose(id);
  };

  const handleDelete = (id) => {
    // Lógica para manejar la eliminación de la fila con el ID proporcionado
    handleClose(id);
  };

  const [filas, setFilas] = React.useState(10);

  const handleChange = (event) => {
    setFilas(event.target.value);
  };

  {/* Columnas de la tabla */ }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Ciudad',
      dataIndex: 'ciudad',
      key: 'ciudad',
      sorter: (a, b) => a.usuario.localeCompare(b.usuario),
    },
    {
      title: 'Aldea',
      dataIndex: 'aldea',
      key: 'aldea',
      sorter: (a, b) => a.usuario.localeCompare(b.usuario),
    },
    {
      title: 'Colonia',
      dataIndex: 'colonia',
      key: 'colonia',
      sorter: (a, b) => a.usuario.localeCompare(b.usuario),
    },
    {
      title: 'Acciones',
      key: 'operation',
      render: (params) =>
        <div key={params.id}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.id}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.id)}
              variant="contained"
              style={{ borderRadius: '10px', backgroundColor: '#634A9E', color: 'white' }}
              startIcon={<Icon>menu</Icon>}
            >
              Opciones
            </Button>
            <Menu
              id={`menu-${params.id}`}
              anchorEl={anchorEl[params.id]}
              keepMounted
              open={Boolean(anchorEl[params.id])}
              onClose={() => handleClose(params.id)}
            >
              <MenuItem onClick={() => handleEdit(params.id)}>
                <Icon>edit</Icon> Editar
              </MenuItem>
              <MenuItem onClick={() => handleDetails(params.id)}>
                <Icon>visibility</Icon> Detalles
              </MenuItem>
              <MenuItem onClick={() => handleDelete(params.id)}>
                <Icon>delete</Icon> Eliminar
              </MenuItem>
            </Menu>
          </Stack>
        </div>
      ,
    },
  ];


  {/* Datos de la tabla */ }
  const data = [];
  for (let i = 0; i < 50; ++i) {
    data.push({
      key: i.toString(),
      id: i.toString(),
      ciudad: 'ciudada ' + i,
      aldea: 'aldea ' + i,
      colonia: 'colonia ' + i,
      // tabla: [
      //   { key: '1', name: 'Value1' + i, platform: 'Value2' + i },
      //   { key: '2', name: 'Value3' + i, platform: 'Value4' + i },
      //   // Add more rows to the nested table here...
      // ],
    });
  }


  {/* Columnas de la tabla */ }
  // const columns = [
  //   { field: 'id', headerName: 'Id', width: 100 },
  //   { field: 'descripcion', headerName: 'Colonia', flex: 1 },
  //   { field: 'aldea', headerName: 'Aldea', width: 250 }, 
  //   { field: 'ciudad', headerName: 'Ciudad', flex: 1 },       
  //   {
  //     field: 'acciones',
  //     headerName: 'Acciones',
  //     flex:1,
  //     renderCell: (params) => {
        // const [anchorEl, setAnchorEl] = React.useState(null);
  
        // const handleClick = (event) => {
        //   setAnchorEl(event.currentTarget);
        // };
  
        // const handleClose = () => {
        //   setAnchorEl(null);
        // };
  
        // const handleEdit = () => {
        //   // Implementa la función para editar aquí
        //   handleClose();
        // };
  
        // const handleDetails = () => {
        //   // Implementa la función para detalles aquí
        //   handleClose();
        // };


  
  //       return (
  //         <Stack direction="row" spacing={1}>
  //           <Button
  //             aria-controls={`menu-${params.id}`}
  //             aria-haspopup="true"
  //             onClick={handleClick}
  //             variant="contained"
  //             style={{ borderRadius: '10px', backgroundColor: '#634A9E', color: 'white' }}
  //             startIcon={<Icon>menu</Icon>}
  //           >
  //             Opciones
  //           </Button>
  //           <Menu
  //             id={`menu-${params.id}`}
  //             anchorEl={anchorEl}
  //             keepMounted
  //             open={Boolean(anchorEl)}
  //             onClose={handleClose}
  //           >
  //             <MenuItem onClick={handleEdit}>
  //               <Icon>edit</Icon> Editar
  //             </MenuItem>
  //             <MenuItem onClick={handleDetails}>
  //               <Icon>visibility</Icon> Detalles
  //             </MenuItem>
  //             <MenuItem onClick={DialogEliminar}>
  //               <Icon>delete</Icon> Eliminar
  //             </MenuItem>

  //           </Menu>
  //         </Stack>
  //       );
  //     },
  //   },
  // ];

  // {/* Datos de la tabla */ }
  // const rows = [
  //   { id: '1', descripcion: 'Colonia los Andes',aldea:'Aldea juanito ventura',ciudad:'Choloma'},
  //   { id: '2', descripcion: 'Colonia BuenaVentura',aldea:'Aldea juanito ventura',ciudad:'Choloma'},
  //   { id: '3', descripcion: 'Colonia Prado Alto',aldea:'Aldea juanito ventura',ciudad:'Choloma'},
  //   { id: '4', descripcion: 'Colonia Montes',aldea:'Aldea juanito ventura',ciudad:'Choloma'},
  //   { id: '5', descripcion: 'Colonia Pedro Lopez',aldea:'Aldea juanito ventura',ciudad:'Choloma'},
  // ];

  {/* Función para mostrar la tabla y mostrar agregar */ }
  const VisibilidadTabla = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAdd(!mostrarAdd);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  {/* Filtrado de datos */ }
  const filteredRows = data.filter((row) =>
    Object.values(row).some((value) =>
      typeof value === 'string' && value.toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <Card sx={{ minWidth: 275, margin: '40px' }}>
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/RBmR7C6/COLONIAS.png"
        alt="Encabezado de la carta"
      />
      <Collapse in={mostrarIndex}>
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>

          {/* Botón de Nuevo */}
          <Stack direction="row" spacing={1}>
            <Button
              startIcon={<Icon>add</Icon>}
              variant="contained"
              color="primary"
              style={{ borderRadius: '10px' }}
              sx={{
                backgroundColor: '#634A9E', color: 'white',
                "&:hover": { backgroundColor: '#6e52ae' },
              }}
              onClick={VisibilidadTabla}
            >
              Nuevo
            </Button>
          </Stack>

          <Stack direction="row" spacing={1}>
            <label className='mt-8'>Filas por página:</label>
            <FormControl sx={{ minWidth: 50 }} size="small">
              {/* <InputLabel id="demo-select-small-label">Filas</InputLabel> */}
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={filas}
                // label="Filas"  
                onChange={handleChange}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
              </Select>
            </FormControl>

            {/* Barra de Busqueda en la Tabla */}
            <TextField
              style={{ borderRadius: '10px' }}
              placeholder='Buscar'
              value={searchText}
              onChange={handleSearchChange}
              size="small"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton edge="start">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

          </Stack>
        </CardContent>
      </Collapse>






      {/* Tabla */}
      <Collapse in={mostrarIndex}>
        <div className='center' style={{ width: '95%', margin: 'auto' }}>

          <Table
            columns={columns}
            // expandable={{
            //   expandedRowRender: (record) => <Table columns={columns} dataSource={record.tabla} pagination={false} />,
            //   rowExpandable: (record) => record.name !== 'Not Expandable',
            // }}
            dataSource={filteredRows}
            size="small"
            pagination={{
              pageSize: filas
              , className: 'decoration-white'
            }}

          />
        </div>
      </Collapse>






      {/* Formulario Agregar */}
      <Collapse in={mostrarAdd}>
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>
              </Typography>
            </Grid> 
            <Grid item xs={6}>
              <FormControl
                fullWidth
              >
                <InputLabel htmlFor="grouped-native-select">Ciudades</InputLabel>
                <Select
                  style={{ borderRadius: '3px' }}
                  label="Ciudades"
                  defaultValue=' '
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl
                fullWidth
              >
                <InputLabel htmlFor="grouped-native-select">Aldeas</InputLabel>
                <Select
                  style={{ borderRadius: '3px' }}
                  label="Aldeas"
                  defaultValue=' '

                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                fullWidth
              >
                <TextField
                  style={{ borderRadius: '10px' }}
                  label="Colonia"
                  defaultValue=' '

                />
              </FormControl>
            </Grid>        
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right' }} >
              <Button
                startIcon={<Icon>checked</Icon>}
                variant="contained"
                color="primary"
                style={{ borderRadius: '10px', marginRight: '10px' }}
                sx={{
                  backgroundColor: '#634A9E', color: 'white',
                  "&:hover": { backgroundColor: '#6e52ae' },
                }}
                onClick={VisibilidadTabla}
              >
                Guardar
              </Button>

              <Button
                startIcon={<Icon>close</Icon>}
                variant="contained"
                color="primary"
                style={{ borderRadius: '10px' }}
                sx={{
                  backgroundColor: '#DAD8D8', color: 'black',
                  "&:hover": { backgroundColor: '#BFBABA' },
                }}
                onClick={VisibilidadTabla}
              >
                Cancelar
              </Button>
            </Grid>

          </Grid>
        </CardContent>
      </Collapse>


      <Dialog
        open={Eliminar}
        fullWidth="md"
        onClose={DialogEliminar}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Confirmación de Eliminación
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          ¿Está seguro(a) que desea eliminar este registro?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right' }} >
              <Button
                startIcon={<Icon>checked</Icon>}
                variant="contained"
                color="primary"
                style={{ borderRadius: '10px', marginRight: '10px' }}
                sx={{
                  backgroundColor: '#634A9E', color: 'white',
                  "&:hover": { backgroundColor: '#6e52ae' },
                }}
                onClick={DialogEliminar}
              >
                Eliminar
              </Button>

              <Button
                startIcon={<Icon>close</Icon>}
                variant="contained"
                color="primary"
                style={{ borderRadius: '10px' }}
                sx={{
                  backgroundColor: '#DAD8D8', color: 'black',
                  "&:hover": { backgroundColor: '#BFBABA' },
                }}
                onClick={DialogEliminar}
              >
                Cancelar
              </Button>
            </Grid>
        </DialogActions>
      </Dialog>

    </Card>
  );
}

export default ColoniasIndex;



