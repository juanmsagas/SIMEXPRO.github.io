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
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Swal from 'sweetalert2';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { DownOutlined } from '@ant-design/icons';
import { Badge, Dropdown, Space, Table } from 'antd';
import { keyBy } from 'lodash';

function MarcasIndex() {
    const [searchText, setSearchText] = useState('');
    const [mostrarIndex, setmostrarIndex] = useState(true);
    const [mostrarAdd, setmostrarAdd] = useState(false);
    const [Eliminar, setEliminar] = useState(false);

    const [marca, setMarca] = useState('');
    const [isMarcaValid, setIsMarcaValid] = useState(true);


    // const handleGuardarClick = () => {
    // let valid = true;
    // if (marca.trim() === '') {
    //   setIsMarcaValid(false);
    //   valid = false;
    // }
    // if (valid) {
    //   setMarca('');
    // }
    // };
  
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
  
    const handleEdit = () => {
      // Lógica para manejar la edición de la fila con el ID proporcionado
      handleClose();
    };
  
    const handleDetails = () => {
      // Lógica para manejar la visualización de detalles de la fila con el ID proporcionado
      handleClose();
    };
  
    const handleDelete = () => {
      // Lógica para manejar la eliminación de la fila con el ID proporcionado
      handleClose();
    };
  
    const [filas, setFilas] = React.useState(10);
  
    const handleChange = (event) => {
      setFilas(event.target.value);
    };
  
  
    /*Columnas de la tabla*/
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Marca',
        dataIndex: 'marca',
        key: 'marca',
        sorter: (a, b) => a.marca.localeCompare(b.marca), //sorting para Letras
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
                <MenuItem onClick={() => DialogEliminar()}>
                  <Icon>delete</Icon> Eliminar
                </MenuItem>
              </Menu>
            </Stack>
          </div>
        ,
      },
    ];
  

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

  const defaultMarcasValues = {
    marca: '',
  }

  const MarcasSchema = yup.object().shape({
    marca: yup.string().required(),
  })

    {/*Datos de la tabla*/  }
    const data = [];
    for (let i = 1; i < 30; ++i) {
      data.push({
        key: i.toString(),
        id: i.toString(),
        marca: 'marca',
        // tabla: [
        //     { key: '1', marca: 'Juki'},
        //     { key: '2', marca: 'Pegasus'},
        //     { key: '3', marca: 'Singer'},
        //     { key: '4', marca: 'Rimoldi'},
        //     // Add more rows to the nested table here...
        //   ],
      });
    }
  
  
    const handleSearchChange = (event) => {
      setSearchText(event.target.value);
    };
  
    {/*Filtrado de datos*/  }
    const filteredRows = data.filter((row) =>
      Object.values(row).some((value) =>
        typeof value === 'string' && value.toLowerCase().includes(searchText.toLowerCase())
      )
    );

    
  {/* Función para mostrar la tabla y mostrar agregar */ }
  const VisibilidadTabla = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAdd(!mostrarAdd);
  };

  {/* Función para mostrar la tabla y mostrar agregar */ }
  const VisibilidadTabla2 = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAdd(!mostrarAdd);
    reset(defaultMarcasValues);
  };

  const {handleSubmit, register, reset, control, watch, formState } = useForm({
    defaultMarcasValues,
    mode: 'all',
    resolver: yupResolver(MarcasSchema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const onSubmit = (data) => {
    if(data.marca != null){
      if (data.marca.trim() === '') {
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
    reset(defaultMarcasValues);
  };

  {/*Codigo para validaciones */}

    return (
        <Card sx={{ minWidth: 275, margin: '40px' }}>
            <CardMedia
                component="img"
                height="200"
                image="https://i.ibb.co/Mk4C5mv/MARCAS-DE-M-QUINA.png"
                alt="Encabezado de la carta"
            />
            <Collapse in={mostrarIndex}>
                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>

                    {/* Botón de Nuevo */}
                    <Stack direction="row" spacing={5}>
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
                {/* <div style={{ height: 400, width: '100%', marginLeft: '13px', marginRight: '10px' }}>
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
                        pageSizeOptions={[10, 20, 50]}s
                    />
                </div> */}
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
                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                    <Grid container spacing={3}>


                    <Grid item xs={6} >
                        <div className="mt-40 mb-16" style={{ width: '500px', marginLeft: '210px' }}>
                            <Controller
                                render={({ field }) => (
                                    <TextField
                                    {...field}
                                    label="Marca"
                                    variant="outlined"
                                    error={!!errors.marca}
                                    placeholder='Ingrese el nombre de la marca'
                                    fullWidth
                                    InputProps={{startAdornment: (<InputAdornment position="start"></InputAdornment>),}}
                                    />
                                )}
                                name="marca"  
                                control={control}
                            />
                        </div>
                    </Grid>



                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right' }}>
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

export default MarcasIndex;



