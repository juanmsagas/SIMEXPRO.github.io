/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, FormControl, Icon, IconButton, InputAdornment, InputLabel, TextField } from '@mui/material';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid'
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

import Zoom from '@mui/material/Zoom';
import Grow from '@mui/material/Grow';

import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

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


function UsuariosIndex() {
  const [searchText, setSearchText] = useState('');
  const [mostrarIndex, setmostrarIndex] = useState(true);
  const [mostrarAdd, setmostrarAdd] = useState(false);
  const [Eliminar, setEliminar] = useState(false);


  const [cantidad, setCantidad] = useState('');
  const [fechaRevision, setFechaRevision] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [isCantidadValid, setIsCantidadValid] = useState(true);
  const [isFechaRevisionValid, setIsFechaRevisionValid] = useState(true);
  const [isObservacionesValid, setIsObservacionesValid] = useState(true);


  const handleImageUpload = () => {
    // Add your image upload logic here
  };

  const handleGuardarClick = () => {
    let valid = true;
    if (cantidad.trim() === '') {
      setIsCantidadValid(false);
      valid = false;
    }
    if (fechaRevision.trim() === '') {
      setIsFechaRevisionValid(false);
      valid = false;
    }
    if (observaciones.trim() == '') {
      setIsObservacionesValid(false);

      valid = false;
    }

    if (valid) {
      // Your logic to save data when all fields are valid
      // console.log('Data saved!');
      // Reset the form
      setCantidad('');
      setFechaRevision('');
      setObservaciones('');
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
      title: 'Usuario',
      dataIndex: 'usuario',
      key: 'usuario',
    },
    {
      title: 'Empleado',
      dataIndex: 'empleado',
      key: 'empleado',
    },
    {
      title: 'Rol',
      dataIndex: 'rol',
      key: 'rol',
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
      empleado: 'empleado ' + i,
      usuario: 'usuario ' + i,
      rol: 'rol ' + i,
      // tabla: [
      //   { key: '1', name: 'Value1' + i, platform: 'Value2' + i },
      //   { key: '2', name: 'Value3' + i, platform: 'Value4' + i },
      //   // Add more rows to the nested table here...
      // ],
    });
  }

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
        image="https://i.ibb.co/RgGNgZP/USUARIOS.png"
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
            {/* Botón para agregar imagen */}
            <Grid item xs={4} style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <button
                style={{
                  width: '25rem', // Set the desired width for the square button
                  height: '25rem', // Set the same value for height to make it square
                  backgroundColor: 'transparent',
                  border: '2px solid #634A9E',
                  color: 'black',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  marginBottom: '10px',
                }}
              >
                <Icon style={{ marginRight: '5px' }}>add_photo_alternate</Icon> Agregar Imagen
              </button>
            </Grid>

            {/* Right column for all the TextField  InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">

                        </InputAdornment>
                      ),

                    }}
s */}
            <Grid item xs={8} style={{ marginTop: '30px' }}>
              <Grid container spacing={3}>
                {/* Etiqueta "Nuevo Usuario" */}
                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                </Grid>

                {/* Left column for TextFields */}
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    {/* TextField Usuario */}
                    <TextField InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">

                        </InputAdornment>
                      ),

                    }}

                      style={{ borderRadius: '3px', marginTop: '10px' }}

                      label="Usuario"
                      placeholder="Usuario"

                    />
                  </FormControl>

                  <FormControl fullWidth>
                    {/* TextField Contraseña */}
                    <TextField InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">

                        </InputAdornment>
                      ),

                    }}

                      style={{ borderRadius: '3px', marginTop: '10px' }}

                      label="Contraseña"
                      placeholder="Contraseña"

                    />
                  </FormControl>

                  <FormControl fullWidth>
                    {/* TextField Contraseña */}
                    <TextField InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">

                        </InputAdornment>
                      ),

                    }}
                      placeholder="Correo Eléctronico"

                      style={{ borderRadius: '3px', marginTop: '10px' }}

                      label="Correo Eléctronico"

                    />
                  </FormControl>


                </Grid>

                <Grid item xs={6} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="grouped-native-select">Empleado</InputLabel>
                    <TextField
                      style={{ borderRadius: '3px', marginTop: '1.1rem' }}
                      label="Empleado"
                      select
                      placeholder="Empleado"
                      InputProps={{
                        startAdornment: <InputAdornment position="start" />,
                      }}
                    />
                  </FormControl>



                  <FormControl fullWidth>
                    <InputLabel htmlFor="grouped-native-select">Rol</InputLabel>
                    <TextField
                      style={{ borderRadius: '3px', marginTop: '1rem' }}
                      label="Rol"
                      select
                      placeholder="Rol"
                      InputProps={{
                        startAdornment: <InputAdornment position="start" />,
                      }}
                    />
                  </FormControl>


                  <FormControl fullWidth>
                    <FormControlLabel
                      control={<Switch sx={{ '&.Mui-checked': { color: '#634A9E' } }} />}
                      label="Administrador"
                      labelPlacement="rigth"
                      style={{ marginTop: '25px' }}
                    />
                  </FormControl>
                </Grid>


              </Grid>


            </Grid>

            {/* Botones de "Guardar" y "Cancelar" */}
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right' }} >
              <Button
                startIcon={<Icon>check</Icon>}
                variant="contained"
                color="primary"
                style={{
                  borderRadius: '10px',
                  marginRight: '10px',
                }}
                sx={{
                  backgroundColor: '#634A9E', color: 'white',
                  "&:hover": { backgroundColor: '#6e52ae' },
                }}
                onClick={handleGuardarClick}
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

export default UsuariosIndex;



