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
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Swal from 'sweetalert2';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { DownOutlined } from '@ant-design/icons';
import { Badge, Dropdown, Space, Table } from 'antd';
import { keyBy } from 'lodash';

function MaquinasIndex() {
    const [searchText, setSearchText] = useState('');
    const [mostrarIndex, setmostrarIndex] = useState(true);
    const [mostrarAdd, setmostrarAdd] = useState(false);
    const [Eliminar, setEliminar] = useState(false);

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
        title: 'Máquina',
        dataIndex: 'maquina',
        key: 'maquina',
        sorter: (a, b) => a.maquina.localeCompare(b.maquina), //sorting para Letras
      },
      {
        title: 'Modelo',
        dataIndex: 'modelo',
        key: 'modelo',
        sorter: (a, b) => a.modelo.localeCompare(b.modelo), //sorting para Letras
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

  const defaultMaquinasValues = {
    maquina: '',
  }

  const MaquinasSchema = yup.object().shape({
    maquina: yup.string().required(),
  })

    {/*Datos de la tabla*/  }
    const data = [];
    for (let i = 1; i < 30; ++i) {
      data.push({
        key: i.toString(),
        id: i.toString(),
        maquina: 'maquina',
        modelo: 'modelo',
        // tabla: [
          // { key: '1',maquina: '23123',    modelo: 'Singer Heavy Duty 4423' },
          // { key: '2',maquina: '12323', modelo: 'Brother CS6000i' },
          // { key: '3',maquina: '34534',  modelo: 'Janome Magnolia 7318' },
          // { key: '4',maquina: '54565',   modelo: 'Juki HZL-F600' },

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
    reset(defaultMaquinasValues);
  };

  const {handleSubmit, register, reset, control, watch, formState } = useForm({
    defaultMaquinasValues,
    mode: 'all',
    resolver: yupResolver(MaquinasSchema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const onSubmit = (data) => {
    if(data.maquina != null || data.modelo != null){
      if (data.maquina.trim() === '') {
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
    reset(defaultMaquinasValues);
  };

    return (
        <Card sx={{ minWidth: 275, margin: '40px' }}>
            <CardMedia
                component="img"
                height="200"
                image="https://i.ibb.co/86vkzPQ/MAQUINAS.png"
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
                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '30px' }}>
                    <Grid container spacing={3}>
   

                        <Grid item xs={6}>
                        <div className="mt-1 mb-16" >
                            <Controller
                                render={({ field }) => (
                                    <TextField
                                    {...field}
                                    label="Marca"
                                    variant="outlined"
                                    error={!!errors.maquina}
                                    placeholder='Ingrese el número de serie'
                                    style={{ borderRadius: '10px' }}
                                    fullWidth
                                    InputProps={{startAdornment: (<InputAdornment position="start"></InputAdornment>),}}
                                    />
                                )}
                                name="maquina"  
                                control={control}
                            />
                        </div>
                        </Grid>         
                        
                    
                        <Grid item xs={6}>
                            <FormControl
                                fullWidth
                            >
                                <InputLabel htmlFor="grouped-native-select">Modelo</InputLabel>
                                <Select
                                variant="outlined"
                                error={!!errors.modelo}
                                defaultValue={" "}
                                    style={{ borderRadius: '10px' }}
                                    label="Modelo"
                                >
                                    <MenuItem value='1'>KJS728</MenuItem>
                                    <MenuItem value='2'>MNE923</MenuItem>
                                    <MenuItem value='3'>EMM536</MenuItem>
                                </Select>
                            </FormControl>
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

export default MaquinasIndex;



