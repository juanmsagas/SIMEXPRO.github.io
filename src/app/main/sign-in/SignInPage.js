import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { InputAdornment } from '@material-ui/core';
import KeyIcon from '@mui/icons-material/Key';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
/**
 * Form Validation Schema
 */

const fields = {
  usuario: '',
  contrasena: '',
};

const schema = yup.object().shape({
  usuario: yup.string().required(''),
  contrasena: yup.string().required(''),
});

const Toast = Swal.mixin({
  toast: true,
  position: 'top-right',
  iconColor: 'red',
  width: 400,
  customClass: {
    popup: 'colored-toast',
  },
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

const Toast2 = Swal.mixin({
  toast: true,
  position: 'top-right',
  iconColor: 'green',
  width: 400,
  customClass: {
    popup: 'colored-toast',
  },
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

function SignInPage() {
  const navigate = useNavigate();
  const Image = 'https://i.ibb.co/DVgPnbS/fondo.png';
  const [Usuario, setUsuario] = useState('');
  const [Contrasena, setContrasena] = useState('');
  const [UsuarioError, setUsuarioError] = useState(false);
  const [ContrasenaError, setContrasenaError] = useState(false);

  const { handleSubmit, register, reset, control, watch, getValues, formState } = useForm({
    fields,
    mode: 'all',
    resolver: yupResolver(schema),
  });
  const { isValid, dirtyFields, errors, touchedFields } = formState;

  const data = watch();

  const Validar = () => {
    if (data.usuario === 'admin' && data.contrasena === 'admin') {
      Toast2.fire({
        icon: 'success',
        title: 'Bienvenido!',
      });
      navigate('/Roles/RolesIndex');
      console.log(data);
    } else if (data.usuario === undefined || data.contrasena === undefined) {
      Toast.fire({
        icon: 'error',
        title: 'No se permiten campos vacios.',
      });
      console.log('campos vacios');
    } else if (data.contrasena !== '123' || data.usuario !== '123') {
      Toast.fire({
        icon: 'error',
        title: 'Usuario o Contraseña incorrectos.',
      });
      console.log('campos incorrectos');
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-1 min-w-0">
      <Paper className="h-full sm:h-auto md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full md:w-1/2 py-8 px-16 sm:p-48 md:p-64 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none ltr:border-r-1 rtl:border-l-1 ">
        <div className="w-full max-w-400 sm:w-400 mx-auto sm:mx-0">
          <Typography
            style={{ textAlign: 'center', color: '#9452F9', fontSize: '40px' }}
            className="mt-32 text-4xl font-extrabold tracking-tight leading-tight"
          >
            INICIO DE SESIÓN
          </Typography>

          <div style={{ textAlign: 'center' }} className="flex items-baseline mt-2 font-medium">
            <Typography style={{ fontSize: '20px' }}>
              Ingrese su usuario y contraseña para iniciar sesión
            </Typography>
          </div>

          <form name="loginForm">
            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Usuario"
                  type="email"
                  variant="outlined"
                  required
                  fullWidth
                  error={!!errors.usuario}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircleIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
              control={control}
              name="usuario"
            />

            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24 col-9"
                  label="Contraseña"
                  type="password"
                  variant="outlined"
                  required
                  fullWidth
                  error={!!errors.contrasena}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <KeyIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
              control={control}
              name="contrasena"
            />

            <Button
              variant="contained"
              aria-label=" Inicar Sesion"
              type="button"
              size="large"
              fullWidth
              sx={{
                backgroundColor: '#9452F9',
                color: 'white',
                borderRadius: '5px',
                '&:hover': { backgroundColor: '#7b4ac6' },
              }}
              onClick={Validar}
            >
              Inicar Sesión
            </Button>
          </form>
        </div>
      </Paper>

      <Box
        className="relative hidden md:flex flex-auto items-center justify-center h-full p-64 lg:px-112 overflow-hidden"
        sx={{ backgroundImage: `url(${Image})` }}
        style={{ backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
      />
    </div>
  );
}

export default SignInPage;
