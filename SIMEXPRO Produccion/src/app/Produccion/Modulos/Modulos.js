/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {
  Button,
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
import FormLabel from "@mui/material/FormLabel";
import { DownOutlined } from '@ant-design/icons';
import { Badge, Dropdown, Space, Table } from 'antd';
import { keyBy } from 'lodash';

function ModuloIndex() {
  const [searchText, setSearchText] = useState('');
  const [mostrarIndex, setmostrarIndex] = useState(true);
  const [mostrarAdd, setmostrarAdd] = useState(false);
  const [mostrarEdit, setmostrarEdit] = useState(false);
  const [Eliminar, setEliminar] = useState(false);
  const [filas, setFilas] = React.useState(10);
  const [id, setid] = useState('')
  const [modulos, setmodulos] = useState('')

  const VisibilidadTablaEdit = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarEdit(!mostrarEdit);
  };  

  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  const handleClose = (id) => {
    setAnchorEl(prevState => ({
      ...prevState,
      [id]: null,
    }));
  };

  const handleEdit = (id,modulos) => {
    setmodulos(modulos);
    setid(id);
    console.log(modulos);
    VisibilidadTablaEdit();               
    handleClose(id);
  };

  const handleDetails = (id) => {
    // Lógica para manejar la visualización de detalles de la fila con el ID proporcionado
    handleClose(id);
  };

  const handleDelete = (id) => {
    DialogEliminar();
    handleClose(id);
  };

  {/* Función para mostrar la tabla y mostrar editar */ }
  const VisibilidadTablaEditar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarEdit(!mostrarEdit);
  };

  const handleClick = (event, id) => {
    setAnchorEl(prevState => ({
      ...prevState,
      [id]: event.currentTarget,
    }));
  };

  // {/* Columnas de la tabla */ }
  // const columns = [
  //   { field: 'id', headerName: 'Id', width: 200 },
  //   { field: 'proceso', headerName: 'Proceso', flex: 2 },
  //   { field: 'empleado', headerName: 'Supervisor', flex: 2 },
  //   {
  //     field: 'acciones',
  //     headerName: 'Acciones',
  //     flex: 1,
  //     renderCell: (params) => {
  //       const [anchorEl, setAnchorEl] = React.useState(null);

  //       const handleClick = (event) => {
  //         setAnchorEl(event.currentTarget);
  //       };

  //       const handleClose = () => {
  //         setAnchorEl(null);
  //       };

  //       const handleEdit = () => {
  //         VisibilidadTablaEditar()
  //         handleClose();
  //       };

  //       const handleDetails = () => {
  //         // Implementa la función para detalles aquí
  //         handleClose();
  //       };

  //       const handleDelete = () => {
  //         // Implementa la función para eliminar aquí
  //         handleClose();
  //       };

  //       const handlePrint = () => {
  //         // Implementa la función para imprimir aquí

  //         handleClose();
  //       };

  //       const handleBoletin = () => {
  //         // Implementa la función para imprimir aquí
  //         handleClose();
  //       };

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
  //               <Icon>edit</Icon>ㅤEditar
  //             </MenuItem>
  //             <MenuItem onClick={handleDetails}>
  //               <Icon>visibility</Icon>ㅤDetalles
  //             </MenuItem>
  //             <MenuItem onClick={handleDelete}>
  //               <Icon>delete</Icon>ㅤEliminar
  //             </MenuItem>
  //             <MenuItem onClick={handlePrint}>
  //               <Icon>print</Icon>ㅤImprimir
  //             </MenuItem>
  //             {true && (
  //               <MenuItem onClick={handleBoletin}>
  //                 <Icon>insert_drive_file</Icon>ㅤGenerar Boletin
  //               </MenuItem>
  //             )}
  //           </Menu>
  //         </Stack>
  //       );
  //     },
  //   // },
  // ]; 

  const [anchorEl, setAnchorEl] = useState({});
 /*Columnas de la tabla*/
 const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    sorter: (a, b) => a.id - b.id, //sorting para Numeros
  },
  {
    title: 'Modulo',
    dataIndex: 'modulo',
    key: 'modulo',
    sorter: (a, b) => a.modulo.localeCompare(b.modulo), //sorting para Letras
  },
 {
  title: 'Proceso',
    dataIndex: 'proceso',
    key: 'proceso',
    sorter: (a, b) => a.proceso.localeCompare(b.proceso), //sorting para Letras
 },
 {
  title: 'Empleado',
    dataIndex: 'empleado',
    key: 'empleado',
    sorter: (a, b) => a.empleado.localeCompare(b.empleado), //sorting para Letras
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
            <MenuItem onClick={() => handleEdit(params.id, params.areas)}>
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
  const rows = [
    {key:1, id: '1', modulo: 'M9862ON', proceso: 'Corte', empleado: 'Junior Mario Loaiza' },
    {key:2, id: '2', modulo: 'M9562ON', proceso: 'Ensamblaje', empleado: 'Junior Mario Loaiza' },
    {key:3, id: '3', modulo: 'M9362ON', proceso: 'Serigrafía', empleado: 'Junior Mario Loaiza' },
    {key:4, id: '4', modulo: 'M2862ON', proceso: 'Estampado', empleado: 'Junior Mario Loaiza' },
  ];

  {/* Función para mostrar la tabla y mostrar agregar */ }
  const VisibilidadTabla = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAdd(!mostrarAdd);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  {/* Filtrado de datos */ }
  const filteredRows = rows.filter((row) =>
    row.modulo.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Card sx={{ minWidth: 275, margin: '40px' }}>
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/SJQHYkr/M-DULOS.png"
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
        </CardContent>
      </Collapse>





 {/*Tabla*/}
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
                <TextField
                  style={{ borderRadius: '10px', marginLeft: '10px' }}
                  label="Nombre Modulo"
                  defaultValue=' '

                />
              </FormControl>
            </Grid>
            
            <Grid item xs={6}>
              <FormControl
                fullWidth
              >
                <InputLabel htmlFor="grouped-native-select">Procesos</InputLabel>
                <Select
                  style={{ borderRadius: '3px', marginRight: '10px' }}
                  label="Procesos"
                  defaultValue=' '

                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                fullWidth
              >
                <FormLabel
                      className="font-medium text-10"
                      component="legend"
                      style={{marginLeft: '10px'}}
                    >
                      Empleado Encargado
                    </FormLabel>
                <Select
                  style={{ borderRadius: '3px', marginLeft: '10px', marginRight: '10px' }}
                 
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


      {/* Formulario Editar */}
      <Collapse in={mostrarEdit}>
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
                <TextField
                  style={{ borderRadius: '10px', marginLeft: '10px' }}
                  label="Nombre Modulo"
                  defaultValue=' '

                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl
                fullWidth
              >
                <InputLabel htmlFor="grouped-native-select">Procesos</InputLabel>
                <Select
                  style={{ borderRadius: '3px', marginRight: '10px' }}
                  label="Procesos"
                  defaultValue=' '

                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                fullWidth
              >
                <FormLabel
                      className="font-medium text-10"
                      component="legend"
                      style={{marginLeft: '10px'}}
                    >
                      Empleado Encargado
                    </FormLabel>
                <Select
                  style={{ borderRadius: '3px', marginLeft: '10px', marginRight: '10px' }}
                 
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
                onClick={VisibilidadTablaEditar} // Función para enviar datos de editar
              >
                Editar
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
                onClick={VisibilidadTabla} // Función para vacias textboxs
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

export default ModuloIndex;



