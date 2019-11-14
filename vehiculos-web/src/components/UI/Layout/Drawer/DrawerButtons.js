import React from 'react';
import List from '@material-ui/core/List';
import AddIcon from '@material-ui/icons/AddCircle';
import ListIcon from '@material-ui/icons/List';
import DrawerButton from './DrawerButton';
import HistoryIcon from '@material-ui/icons/History';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

const drawerButtons = ({ onClose }) => (
  <List>
    <div>
    <DrawerButton
        name="Agregar Vehiculo"
        path="/vehiculos/nuevo"
        icon={<AddIcon />}
        onClose={onClose}
      />
      <DrawerButton
        name="Listado Vehiculos"
        path="/"
        icon={<ListIcon />}
        onClose={onClose}
      />
      <DrawerButton
        name="Historial Asignaciones"
        path="/Asignaciones"
        icon={<HistoryIcon />}
        onClose={onClose}
      />
        <DrawerButton
        name="Notificaciones"
        path="/Notificaciones"
        icon={<NotificationsActiveIcon />}
        onClose={onClose}
      />
    </div>
    
  </List>
);

export default drawerButtons;
