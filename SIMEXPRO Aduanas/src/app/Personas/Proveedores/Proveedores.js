
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
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { height } from '@mui/system';
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { DownOutlined } from '@ant-design/icons';
import { Badge, Dropdown, Space, Table } from 'antd';
import { keyBy } from 'lodash';

function ProveedoresIndex() {
  const [searchText, setSearchText] = useState('');
  const [mostrarIndex, setmostrarIndex] = useState(true);
  const [mostrarAdd, setmostrarAdd] = useState(false);
  const [Eliminar, setEliminar] = useState(false);

  const [nombre, setNombre] = useState('');
  const [contacto, setContacto] = useState('');
  const [telefono, setTelefono] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [isNombreValid, setIsNombreValid] = useState(true);
  const [isContactoValid, setIsContactoValid] = useState(true);
  const [isTelefonoValid, setIsTelefonoValid] = useState(true);
  const [isCiudadValid, setIsCuidadValid] = useState(true);

  const handleGuardarClick = () => {
    let valid = true;
    if (oficina.trim() === '') {
      setIsNombreValid(false);
      valid = false;
    }
    if (oficina.trim() === '') {
      setIsContactoValid(false);
      valid = false;
    }
    if (oficina.trim() === '') {
      setIsTelefonoValid(false);
      valid = false;
    }
    if (oficina.trim() === '') {
      setIsCiudadValid(false);
      valid = false;
    }
    if (valid) {
      // Your logic to save data when all fields are valid
      // console.log('Data saved!');
      // Reset the form
      setCargo('');
    }
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

  const handleEdit = () => {
    // Implementa la función para editar aquí
    handleClose();
  };

  const handleDetails = () => {
      // Implementa la función para detalles aquí
      handleClose();
  };

  const handleDelete = () => {
    // Implementa la función para eliminar aquí
    handleClose();
  };

  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

      {/*TOAST*/}
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-right',
        iconColor: 'red',
        width: 600,
        heigth: 300,
        customClass: {
          popup: 'colored-toast'
        },
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      })
    
      const Toast2 = Swal.mixin({
        toast: true,
        position: 'top-right',
        iconColor: 'green',
        customClass: {
          popup: 'colored-toast'
        },
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      })
    
       {/* Validaciones de la pantalla de crear*/ }
       const defaultValues = {
        nombre: '',
        contacto: '',
        telefono: '',
        ciudad: '',
      }
    
      const accountSchema = yup.object().shape({
        nombre: yup.string().required('Debe llenar este campo'),
        contacto: yup.string().required('Debe llenar este campo'),
        telefono: yup.string().required('Debe llenar este campo'),
        ciudad: yup.string().required('Debe llenar este campo'),
      })
      
      const { handleSubmit, register, reset, control, watch, formState } = useForm({
        defaultValues,
        mode: 'all',
        resolver: yupResolver(accountSchema),
      });
    
      const { isValid, dirtyFields, errors, touchedFields } = formState;
      const onSubmit = (data) => {
        if(data.cargo != null ){
          if (data.cargo.trim() === '' ) {
            Toast.fire({
              icon: 'error',
              title: 'No se permiten campos vacios',
            }); 
          } else {
    
            VisibilidadTabla();
            Toast2.fire({
              icon: 'success',
              title: 'Datos guardados exitosamente',
            });
            
          }
        }else{
          Toast.fire({
            icon: 'error',
            title: 'No se permiten campos vacios',
          }); 
        }
      };
    
      const Masiso = () => {
        const formData = watch();
        onSubmit(formData); 
        handleSubmit(onSubmit)(); 
        reset(defaultValues);
      };
      {/* Validaciones de la pantalla de crear*/ }
    
    
      
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
        title: 'Cargo',
        dataIndex: 'cargo',
        key: 'cargo',
        sorter: (a, b) => a.cargo.localeCompare(b.cargo),
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

  // {/* Columnas de la tabla */ }
  // const columns = [
  //   { field: 'id', headerName: 'Id', width: 10 },
  //   { field: 'nombres', headerName: 'NombreCompañia', flex: 1 },
  //   { field: 'contacto', headerName: 'NombreContacto', flex: 1 },
  //   { field: 'telefono', headerName: 'Telefono', flex: 1 }, 
  //   { field: 'ciudad', headerName: 'Ciudad', flex: 1 }, 
  //   {
  //     field: 'acciones',
  //     headerName: 'Acciones',
  //     width: 400,
  //     renderCell: (params) => (
  //       <Stack direction="row" spacing={1}>
  //         <Button
  //           startIcon={<Icon>edit</Icon>}
  //           variant="contained"
  //           style={{ borderRadius: '10px' }}
  //           sx={{
  //             backgroundColor: '#634A9E',
  //             color: 'white',
  //             "&:hover": { backgroundColor: '#6e52ae' },
  //           }}>
  //           Editar
  //         </Button>

  //         <Button
  //           startIcon={<Icon>visibility</Icon>}
  //           variant="contained"
  //           color="primary"
  //           style={{ borderRadius: '10px' }}
  //           sx={{
  //             backgroundColor: '#797979', color: 'white',
  //             "&:hover": { backgroundColor: '#b69999' },
  //           }}
  //         >
  //           Detalles
  //         </Button>
  //         <Button
  //           startIcon={<Icon>delete</Icon>}
  //           variant="contained"
  //           color="primary"
  //           style={{ borderRadius: '10px' }}
  //           sx={{
  //             backgroundColor: '#E40F00', color: 'white',
  //             "&:hover": { backgroundColor: '#eb5f56' },
  //           }}
  //           onClick={DialogEliminar}
  //         >
  //           Eliminar
  //         </Button>
  //       </Stack>
  //     ),
  //   },
  // ];

  {/* Datos de la tabla */ }
  const rows = [
    { id: '1', nombres:'TELMEX',      contacto: 'Daniel Isaac Zepeda'          ,telefono:'46456456456456',ciudad:'San Pedro Sula'},
    { id: '2', nombres:'Sony',        contacto: 'Esdra Cerna'                  ,telefono:'75675675634223',ciudad:'Choloma'},
    { id: '3', nombres:'Nvidia',      contacto: 'Eder Jesus Sanchez Martínez'  ,telefono:'90345343676575',ciudad:'La Lima'},
    { id: '4', nombres:'Razor',       contacto: 'Karla Alejandro '             ,telefono:'75679808908234',ciudad:'Choloma'},
    { id: '5', nombres:'Mclaren',     contacto: 'Sarai uintanilla'             ,telefono:'89797894534534',ciudad:'Choloma'},
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
    row.nombres.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Card sx={{ minWidth: 275, margin: '40px' }}>
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/JxTYhwv/PROVEEDORES.png"
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






      {/* Tabla */}
      <Collapse in={mostrarIndex}>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            components={{
              Toolbar: GridToolbar,
              Search: SearchIcon,
            }}
            rows={filteredRows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[10, 20, 50]}
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
                  style={{ borderRadius: '10px' }}
                  label="Nombre de la compañia"
                />
              </FormControl>
            </Grid>  
            <Grid item xs={6}>
              <FormControl
                fullWidth
              >
                <TextField
                  style={{ borderRadius: '10px' }}
                  label="Nombre de contacto"
                />
              </FormControl>
            </Grid> 
            <Grid item xs={6}>
              <FormControl
                fullWidth
              >
                <TextField
                  style={{ borderRadius: '10px' }}
                  label="Teléfono"
                />
              </FormControl>
            </Grid> 
            <Grid item xs={6}>
              <FormControl
                fullWidth
              >
                <TextField
                  style={{ borderRadius: '10px' }}
                  label="Codigo postal"
                />
              </FormControl>
            </Grid> 
            <Grid item xs={6}>
              <FormControl
                fullWidth
              >
                <InputLabel htmlFor="grouped-native-select">País</InputLabel>
                <Select
                  style={{ borderRadius: '3px' }}
                  label="País"
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl
                fullWidth
              >
                <InputLabel htmlFor="grouped-native-select">Provincias</InputLabel>
                <Select
                  style={{ borderRadius: '3px' }}
                  label="Provincias"
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl
                fullWidth
              >
                <InputLabel htmlFor="grouped-native-select">Ciudades</InputLabel>
                <Select
                  style={{ borderRadius: '3px' }}
                  label="Ciudades"
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl
                fullWidth
              >
                <TextField
                  style={{ borderRadius: '10px' }}
                  label="Dirección exacta"
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl
                fullWidth
              >
                <TextField
                  style={{ borderRadius: '10px' }}
                  label="Fax"
                />
              </FormControl>
            </Grid>      
            <Grid item xs={6}>
              <FormControl
                fullWidth
              >
                <TextField
                  style={{ borderRadius: '10px' }}
                  label="Correo electrónico"
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

export default ProveedoresIndex;








