import { NavLink } from 'react-router';

import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
} from '@mui/material';

import { menuOptions } from './menu-options';

interface Props {
  plantId: string;
  open: boolean;
  isMobile: boolean;
  drawerWidth?: number;
  selectChildren?: JSX.Element;
  handleCloseDrawer?: () => void;
}
export const Sidebar = ({
  plantId,
  open,
  isMobile,
  drawerWidth = 240,
  selectChildren,
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
        zIndex: { xs: 10, md: 0 },
      }}
      variant={isMobile ? 'temporary' : 'permanent'}
      anchor='left'
      open={open}
      onClose={handleCloseDrawer}
    >
      <Toolbar />

      <Divider />

      {selectChildren && (
        <>
          {selectChildren}
          <Divider />
        </>
      )}

      <List>
        {menuOptions.map(({ order, label, route, enabled }) => (
          <ListItem key={label} disablePadding>
            <NavLink
              to={`/${plantId}/${route}`}
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
