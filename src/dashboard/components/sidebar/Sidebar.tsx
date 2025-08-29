import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
} from '@mui/material';
import { NavLink } from 'react-router';
import { menuOptions } from './menu-options';

interface Props {
  open: boolean;
  isMobile: boolean;
  drawerWidth?: number;
  handleCloseDrawer?: () => void;
}
export const Sidebar = ({
  drawerWidth = 240,
  isMobile,
  open,
  handleCloseDrawer,
}: Props) => {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
        position: { xs: 'fixed', md: 'relative' },
        zIndex: { xs: 1, md: 0 },
      }}
      variant={isMobile ? 'temporary' : 'permanent'}
      anchor='left'
      open={open}
      onClose={handleCloseDrawer}
    >
      <Toolbar />
      <Divider />
      <List>
        {menuOptions.map(({ order, label, route, enabled }) => (
          <ListItem key={label} disablePadding>
            <NavLink
              to={route}
              style={{
                width: '100%',
                textDecoration: 'none',
                color: 'inherit',
                pointerEvents: enabled ? 'auto' : 'none',
              }}
              tabIndex={enabled ? 0 : -1}
            >
              {({ isActive }) => (
                <ListItemButton selected={isActive} disabled={!enabled}>
                  <ListItemText primary={`${order}. ${label}`} />
                </ListItemButton>
              )}
            </NavLink>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
