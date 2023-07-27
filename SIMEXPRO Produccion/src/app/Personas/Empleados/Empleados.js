
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
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Controller } from 'react-hook-form';
import { DownOutlined } from '@ant-design/icons';
import { Badge, Dropdown, Space, Table } from 'antd';
import { keyBy } from 'lodash';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';




function EmpleadosIndex() {
  const [searchText, setSearchText] = useState('');
  const [mostrarIndex, setmostrarIndex] = useState(true);
  const [mostrarAdd, setmostrarAdd] = useState(false);
  const [Eliminar, setEliminar] = useState(false);
  const [filas, setFilas] = React.useState(10);
  const handleChange = (event) => {
    setFilas(event.target.value);
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


  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };


  /*Columnas de la tabla*/
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id, //sorting para Numeros
    },
    {
      title: 'Nombre Completo',
      dataIndex: 'nombres',
      key: 'nombres',
      sorter: (a, b) => a.nombres.localeCompare(b.nombres)
    },
    {
      title: 'DNI',
      dataIndex: 'dni',
      key: 'dni',
      sorter: (a, b) => a.dni.localeCompare(b.dni)
    },
    {
      title: 'Estado Civil',
      dataIndex: 'estadocivil',
      key: 'estadocivil',
      sorter: (a, b) => a.estadocivil.localeCompare(b.estadocivil)
    },
    {
      title: 'Sexo',
      dataIndex: 'sexo',
      key: 'sexo',
      sorter: (a, b) => a.sexo.localeCompare(b.sexo)
    },
    {
      title: 'Cargo',
      dataIndex: 'cargo',
      key: 'cargo',
      sorter: (a, b) => a.cargo.localeCompare(b.cargo)
    }, {
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
              <MenuItem onClick={() => DialogEliminar(params.id)}>
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
    { id: '1', nombres: 'Daniel Isaac Zepeda', dni: '7845128956237', estadocivil: 'Casado', sexo: 'Masculino', cargo: 'Gerente de planta' },
    { id: '2', nombres: 'Esdra Cerna', dni: '7845128956237', estadocivil: 'Casada', sexo: 'Femenino', cargo: 'Gerente de planta' },
    { id: '3', nombres: 'Eder Jesus Sanchez Martínez', dni: '7845128956237', estadocivil: 'Soltero', sexo: 'Masculino', cargo: 'Gerente de planta' },
    { id: '4', nombres: 'Karla Alejandro ', dni: '7845128956237', estadocivil: 'Soltera', sexo: 'Femenino', cargo: 'Gerente de planta' },
    { id: '5', nombres: 'Sarai Quintanilla', dni: '7845128956237', estadocivil: 'Soltera', sexo: 'Femenino', cargo: 'Gerente de planta' },
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



  {/*TOAST*/ }
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
    empl_Nombre: '',
    empl_Apellido: '',
    empl_DNI: '',
    empl_Sexo: '',
    eciv_Id: 0,
    empl_FechaNacimiento: '',
    empl_Telefono: '',
    empl_Direccion: '',
    pvin_Id: 0,
    empl_CorreoElectronico: '',
    carg_Id: 0,
    empl_EsAdmin: 0

  }

  const accountSchema = yup.object().shape({
    empl_Nombre: yup.string().required('Debe llenar este campo'),
    empl_Apellido: yup.string().required('Debe llenar este campo'),
    empl_DNI: yup.string().required('Debe llenar este campo'),
    empl_Sexo: yup.string().required('Debe llenar este campo'),
    eciv_Id: yup.string().required('Debe llenar este campo'),
    empl_FechaNacimiento: yup.string().required('Debe llenar este campo'),
    empl_Telefono: yup.string().required('Debe llenar este campo'),
    empl_Direccion: yup.string().required('Debe llenar este campo'),
    pvin_Id: yup.string().required('Debe llenar este campo'),
    empl_CorreoElectronico: yup.string().required('Debe llenar este campo'),
    carg_Id: yup.string().required('Debe llenar este campo'),
    empl_EsAduana: yup.string().required('Debe llenar este campo'),
  })

  const { handleSubmit, register, reset, control, watch, formState } = useForm({
    defaultValues,
    mode: 'all',
    resolver: yupResolver(accountSchema),
  });

  const { isValid, dirtyFields, errors, touchedFields } = formState;
  const onSubmit = (data) => {
    if (data.empl_Nombre != null || data.empl_Apellido != null ||
      data.empl_DNI != null || data.empl_Sexo != null || data.eciv_Id != null ||
      data.empl_FechaNacimiento != null || data.empl_Telefono != null || data.empl_Direccion != null ||
      data.pvin_Id != null, data.empl_CorreoElectronico != null || data.carg_Id != null || data.empl_EsAduana != null) {
      if (data.empl_Nombre.trim() === '' || data.empl_Apellido.trim() === '' || data.empl_DNI.trim() === '' || data.empl_Sexo.trim() === ''
        || data.eciv_Id.trim() === '' || data.empl_FechaNacimiento.trim() === '' || data.empl_Telefono.trim() === '' ||
        data.empl_Direccion.trim() === '' || data.pvin_Id.trim() === '' || data.empl_CorreoElectronico.trim() === '' ||
        data.carg_Id.trim() === '' || data.empl_EsAduana.trim() === '') {
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
    } else {
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


  return (
    <Card sx={{ minWidth: 275, margin: '40px' }}>
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/tD9Rjwz/EMPLEADOS.png"
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
        <div className='center' style={{ width: '95%', margin: 'auto' }}>

          <Table
            locale={{
              triggerDesc: 'Ordenar descendente',
              triggerAsc: 'Ordenar ascendente',
              cancelSort: 'Cancelar'
            }}
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
              <div className=" mb-16">
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Nombres"
                      variant="outlined"
                      error={!!errors.empl_Nombre}
                      placeholder='Nombres '
                      fullWidth
                      InputProps={{ startAdornment: (<InputAdornment position="start"></InputAdornment>), }}
                    />
                  )}
                  name="empl_Nombre"
                  control={control}
                />
              </div>
            </Grid>


            <Grid item xs={6}>
              <div className=" mb-16">
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Apellidos"
                      variant="outlined"
                      error={!!errors.empl_Apellido}
                      placeholder='Apellidos '
                      fullWidth
                      InputProps={{ startAdornment: (<InputAdornment position="start"></InputAdornment>), }}
                    />
                  )}
                  name="empl_Apellido"
                  control={control}
                />
              </div>
            </Grid>


            <Grid item xs={6}>
              <div className=" mb-16">
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Número de Identidad"
                      variant="outlined"
                      error={!!errors.empl_DNI}
                      placeholder='Número de Identidad '
                      fullWidth
                      InputProps={{ startAdornment: (<InputAdornment position="start"></InputAdornment>), }}
                    />
                  )}
                  name="empl_DNI"
                  control={control}
                />
              </div>
            </Grid>





            <Grid item xs={6}>
              <InputLabel className='text-xs' style={{marginTop: '-10px'}}>Género</InputLabel>
              <FormControl fullWidth>
                <RadioGroup
                  row
                  name='simple-radio'
                  aria-label='simple-radio'
                >
                  <FormControlLabel value='F' control={<Radio />} label='Femenino' />
                  <FormControlLabel value='M' control={<Radio />} label='Masculino' />
                </RadioGroup>
              </FormControl>
            </Grid>


            <Grid item xs={6}>
              <FormControl
                fullWidth
              >
                <InputLabel htmlFor="grouped-native-select">Estados Civiles</InputLabel>
                <Select
                  style={{ borderRadius: '3px' }}
                  label="Estado Civil"
                />
              </FormControl>
            </Grid>


            
            <Grid item xs={6}>
              <FormControl>
                <DateTimePicker
                  renderInput={(_props) => (

                    <TextField
                      style={{ borderRadius: '10px', width: '168px', marginLeft: '15px' }}
                      className="w-full"
                      {..._props}
                      label="Fecha de nacimiento"
                    />
                  )}
                  className="w-full" />
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
                  label="Dirección exacta"
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
                <InputLabel htmlFor="grouped-native-select">Cargo que desempeña</InputLabel>
                <Select
                  style={{ borderRadius: '3px' }}
                  label="Cargo"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
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

export default EmpleadosIndex;








