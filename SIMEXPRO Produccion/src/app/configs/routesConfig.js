/* eslint-disable react/jsx-pascal-case */
/* eslint-disable camelcase */
import FuseUtils from '@fuse/utils';
import FuseLoading from '@fuse/core/FuseLoading';
import { Navigate } from 'react-router-dom';
import settingsConfig from 'app/configs/settingsConfig';
import SignInConfig from '../main/sign-in/SignInConfig';
import SignUpConfig from '../main/sign-up/SignUpConfig';
import SignOutConfig from '../main/sign-out/SignOutConfig';
import dashboardsConfigs from '../main/dashboards/dashboardsConfigs';
import pagesConfigs from '../main/pages/pagesConfigs';
import CiudadesIndex from '../Ubicaciones/Ciudades/Ciudades';
import ProvinciasIndex from '../Ubicaciones/Provincias/Provincias';
import PaisesIndex from '../Ubicaciones/Paises/Paises';
import ColoniasIndex from '../Ubicaciones/Colonias/Colonias';
import EstadosCivilesIndex from '../Personas/EstadosCiviles/EstadosCiviles';
import CargosIndex from '../Personas/Cargos/Cargos';
import OficinasIndex from '../Personas/Oficinas/Oficinas';
import OficiosProfesiones from '../Personas/OficiosProfesiones/OficiosProfesiones';
import UsuariosIndex from '../Seguridad/Usuarios/Usuarios';
import RolesIndex from '../Seguridad/Roles/roles';
import RolesCrear from '../Seguridad/Roles/roles_crear';
import EmpleadosIndex from '../Personas/Empleados/Empleados';
import ProveedoresIndex from '../Personas/Proveedores/Proveedores';
import CategoriaIndex from '../Inventario/Categoria/Categorias';
import ColoresIndex from '../Prendas/Colores/Colores';
import InspeccionesIndex from '../Produccion/Inspecciones/InspeccionesEstado';
import MaquinaHistorialIndex from '../Maquinaria/MaquinaHistorial/MaquinaHistorial';
import MaterialesIndex from '../Inventario/Materiales/Materiales';
import AreasIndex from '../Inventario/Areas/Areas';
import EstilosIndex from '../Prendas/Estilos/Estilos';
import FuncionesMaquinaIndex from '../Maquinaria/FuncionesMaquina/FuncionesMaquina';
import LotesIndex from '../Inventario/Lotes/Lotes';
import SubcategoriaIndex from '../Inventario/Subcategoria/Subcategorias';
import TipoEmbalajeIndex from '../Inventario/TipoDeEmbalaje/TipoEmbalaje';
import AldeaIndex from '../Ubicaciones/Aldeas/Aldeas';
import OrdenProcesosIndex from '../Produccion/OrdenDeProcesos/OrdenDeProcesos';
import CalendarApp from '../Produccion/Planificación/CalendarApp';
import MaquinasIndex from '../Maquinaria/Máquinas/Maquinas';
import FormaDeEnvioIndex from '../Generales/FormasEnvio/FormasEnvio';
import MonedasIndex from '../Generales/Monedas/monedas';
import ModuloIndex from '../Produccion/Modulos/Modulos';
import ProcesosIndex from '../Produccion/Procesos/Procesos';
import MarcasIndex from '../Maquinaria/MarcasMaquina/MarcasMaquina';
import ModelosMaquinaIndex from '../Maquinaria/ModelosMaquina/ModelosMaquina';
import Revision_de_Calidad_Index from '../Produccion/Revisión de Calidad/RevisionCalidad';

const routeConfigs = [
  ...dashboardsConfigs,
  ...pagesConfigs,
  SignOutConfig,
  SignInConfig,
  SignUpConfig,
];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, settingsConfig.defaultAuth),
  {
    path: '/',
    element: <Navigate to="dashboards/analytics" />,
    auth: settingsConfig.defaultAuth,
  },
  {
    path: 'loading',
    element: <FuseLoading />,
  },
  {
    path: '*',
    element: <Navigate to="pages/error/404" />,
  },
  {
    path: 'Ciudades/Index',
    element: <CiudadesIndex />,
  },
  {
    path: 'RevisionCalidad/Index',
    element: <Revision_de_Calidad_Index />,
  },
  {
    path: 'Provincias/Index',
    element: <ProvinciasIndex />,
  },
  {
    path: 'Paises/Index',
    element: <PaisesIndex />,
  },
  {
    path: 'Colonias/Index',
    element: <ColoniasIndex />,
  },
  {
    path: 'FormaDeEnvio/Index',
    element: <FormaDeEnvioIndex />,
  },
  {
    path: 'Monedas/Index',
    element: <MonedasIndex />,
  },
  {
    path: 'Cargos/Index',
    element: <CargosIndex />,
  },
  {
    path: 'EstadosCiviles/Index',
    element: <EstadosCivilesIndex />,
  },
  {
    path: 'Oficinas/Index',
    element: <OficinasIndex />,
  },
  {
    path: 'OficiosProfesiones/Index',
    element: <OficiosProfesiones />,
  },
  {
    path: 'Usuarios/Index',
    element: <UsuariosIndex />,
  },
  {
    path: 'Empleados/Index',
    element: <EmpleadosIndex />,
  },
  {
    path: 'Proveedores/Index',
    element: <ProveedoresIndex />,
  },
  {
    path: 'Roles/RolesIndex',
    element: <RolesIndex />,
  },
  {
    path: 'Roles/RolesCrear',
    element: <RolesCrear />,
  },
  {
    path: 'Categoria/Index',
    element: <CategoriaIndex />,
  },
  {
    path: 'Colores/Index',
    element: <ColoresIndex />,
  },
  {
    path: 'Inspecciones/Index',
    element: <InspeccionesIndex />,
  },
  {
    path: 'MaquinaHistorial/Index',
    element: <MaquinaHistorialIndex />,
  },
  {
    path: 'Categoria/Index',
    element: <CategoriaIndex />,
  },
  {
    path: 'Colores/Index',
    element: <ColoresIndex />,
  },
  {
    path: 'Inspecciones/Index',
    element: <InspeccionesIndex />,
  },
  {
    path: 'MaquinaHistorial/Index',
    element: <MaquinaHistorialIndex />,
  },
  {
    path: 'Materiales/Index',
    element: <MaterialesIndex />,
  },
  {
    path: 'Areas/Index',
    element: <AreasIndex />,
  },
  {
    path: 'Estilos/Index',
    element: <EstilosIndex />,
  },
  {
    path: 'FuncionesMaquina/Index',
    element: <FuncionesMaquinaIndex />,
  },
  {
    path: 'Lotes/Index',
    element: <LotesIndex />,
  },
  {
    path: 'Subcategorias/Index',
    element: <SubcategoriaIndex />,
  },
  {
    path: 'TipoEmbalaje/Index',
    element: <TipoEmbalajeIndex />,
  },
  {
    path: 'Aldea/Index',
    element: <AldeaIndex />,
  },
  {
    path: 'OrdenProcesos/Index',
    element: <OrdenProcesosIndex />,
  },
  {
    path: 'Planificacion/Index',
    element: <CalendarApp />,
  },
  {
    path: 'Maquinas/Index',
    element: <MaquinasIndex />,
  },
  {
    path: 'Modulo/Index',
    element: <ModuloIndex />,
  },
  {
    path: 'Procesos/Index',
    element: <ProcesosIndex />,
  },
  {
    path: 'Marcas/Index',
    element: <MarcasIndex />,
  },
  {
    path: 'ModelosMaquinas/Index',
    element: <ModelosMaquinaIndex />,
  },
  {
    path: 'ModelosMaquinas/Index',
    element: <ModelosMaquinaIndex />,
  },
];

export default routes;
