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
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Swal from 'sweetalert2';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';


import MUIDataTable from 'mui-datatables' 
import { DownOutlined } from '@ant-design/icons';
import { Badge, Dropdown, Space, Table } from 'antd';
import { keyBy } from 'lodash';


function ProcesosIndex() {
  const [users, setUsers] = useState([])
  const [searchText, setSearchText] = useState('');
  const [mostrarIndex, setmostrarIndex] = useState(true);
  const [mostrarAdd, setmostrarAdd] = useState(false);
  const [mostrarEdit, setmostrarEdit] = useState(false);
  const [Eliminar, setEliminar] = useState(false);
  const [filas, setFilas] = React.useState(10);
  const [id, setid] = useState('')
  const [areas, setareas] = useState('')

  const [procesos, setProcesos] = useState('')


  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  const handleClose = (id) => {
    setAnchorEl(prevState => ({
      ...prevState,
      [id]: null,
    }));
  };

  /*const handleEdit = (id,areas) => {
    setareas(areas);
    setid(id);
    console.log(areas);
    VisibilidadTablaEdit();               
    handleClose(id);
  };*/

 const handleEdit = (id,procesos) =>
  {
    setProcesos(procesos);
    setid(id);
    console.log(procesos);
    VisibilidadTablaEdit();
    handleClose(id);
  }


  const handleDetails = (id) => {
    // Lógica para manejar la visualización de detalles de la fila con el ID proporcionado
    handleClose(id);
  };

  const handleDelete = (id) => {
    DialogEliminar();
    handleClose(id);
  };


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
    title: 'Proceso',
    dataIndex: 'proceso',
    key: 'proceso',
    sorter: (a, b) => a.proceso.localeCompare(b.proceso), //sorting para Letras
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
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleEdit}>
                <Icon>edit</Icon>ㅤEditar
              </MenuItem>
              <MenuItem onClick={handleDetails}>
                <Icon>visibility</Icon>ㅤDetalles
              </MenuItem>
              <MenuItem onClick={handleDelete}>
                <Icon>delete</Icon>ㅤEliminar
              </MenuItem>
              <MenuItem onClick={handlePrint}>
                <Icon>print</Icon>ㅤImprimir
              </MenuItem>
              {true && (
                <MenuItem onClick={handleBoletin}>
                  <Icon>insert_drive_file</Icon>ㅤGenerar Boletin
                </MenuItem>
              )}
            </Menu>
        </Stack>
      </div>
    ,
  },
];

  {/*Datos de la tabla*/  }
  const data = [];
  for (let i = 0; i < 50; ++i) {
    data.push({
      key: i.toString(),
      id: i.toString(),
      procesos: 'Hola' + i,
      // tabla: [
      //   { key: '1', name: 'Value1' + i, platform: 'Value2' + i },
      //   { key: '2', name: 'Value3' + i, platform: 'Value4' + i },
      //   // Add more rows to the nested table here...
      // ],
    });
  }



  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleChange = (event) => {
    setFilas(event.target.value);
  };


  {/*Filtrado de datos*/  }
  const filteredRows = data.filter((row) =>
    Object.values(row).some((value) =>
      typeof value === 'string' && value.toLowerCase().includes(searchText.toLowerCase())
    )
  );

  {/*Codigo para validaciones */}

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    iconColor: 'red',
    width: 400,
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
    width: 400,
    customClass: {
      popup: 'colored-toast'
    },  
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true
  })

  const defaultProcesosValues = {
    procesos: '',
  }

  const procesosSchema = yup.object().shape({
    procesos: yup.string().required(),
  })
  
  const VisibilidadTabla = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAdd(!mostrarAdd);
  };

  const VisibilidadTablaEdit = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarEdit(!mostrarEdit);
  };  

  const VisibilidadTabla2 = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAdd(!mostrarAdd);
    reset(defaultProcesosValues);
  };

  const VisibilidadTabla4 = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarEdit(!mostrarEdit);
    reset(defaultProcesosValues);
  };

  const {handleSubmit, register, reset, control, watch, formState } = useForm({
    defaultProcesosValues,
    mode: 'all',
    resolver: yupResolver(procesosSchema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const onSubmit = (data) => {
    if(data.procesos != null){
      if (data.areas.trim() === '') {
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

  const onSubmitEdit = (data) => {
    if(data.areas != null){
      if (data.areas.trim() === '') {
        Toast.fire({
          icon: 'error',
          title: 'No se permiten campos vacios',
        }); 
      } else {
        VisibilidadTablaEdit();
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

  const handleClick = (event, id) => {
    setAnchorEl(prevState => ({
      ...prevState,
      [id]: event.currentTarget,
    }));
  };

  const Masiso = () => {
    const formData = watch();
    onSubmit(formData); 
    handleSubmit(onSubmit)(); 
    reset(defaultProcesosValues);
  };

  const MasisoEdit = () => {
    const formData = watch();
    onSubmitEdit(formData); 
    handleSubmit(onSubmitEdit)(); 
    reset(defaultProcesosValues);
  };

  {/*Codigo para validaciones */}

  return (


    <Card sx={{ minWidth: 275, margin: '40px' }}>
    <CardMedia
      component="img"
      height="200"
      image="https://i.ibb.co/ftqSrxG/PROCESOS.png"
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
            <Grid item xs={6} >
            <div className="mt-40 mb-16" style={{ width: '500px', marginLeft: '210px' }}>
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Área"
                      variant="outlined"
                      error={!!errors.areas}
                      placeholder='Ingrese el nombre del area'
                      fullWidth
                      InputProps={{startAdornment: (<InputAdornment position="start"></InputAdornment>),}}
                    />
                  )}
                  name="areas"
                  control={control}
                />
                </div>
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
                onClick={Masiso}
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
                onClick={VisibilidadTabla2}
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
            <Grid item xs={6} >
            <div className="mt-40 mb-16" style={{ width: '500px', marginLeft: '210px' }}>
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Área"
                      variant="outlined"
                      value={areas}
                      error={!!errors.areas}
                      placeholder='Ingrese el nombre del area'
                      fullWidth
                      InputProps={{startAdornment: (<InputAdornment position="start"></InputAdornment>),}}
                    />
                  )}
                  name="areas"
                  control={control}
                />
                </div>
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
                onClick={MasisoEdit}
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
                onClick={VisibilidadTabla4}
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

export default ProcesosIndex;