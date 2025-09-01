import { type FC, type InputHTMLAttributes } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

interface Props {
  name: string;
  label: string;
  defaultValue?: unknown;
  open: boolean;
  title?: string;
  contentText?: string;
  type?: InputHTMLAttributes<unknown>['type'];
  handleClose?: () => void;
  handleSubmit?: (value: string | number) => void;
}

export const FormDialog: FC<Props> = ({
  name,
  label,
  defaultValue,
  type,
  open,
  title = 'Subscribe',
  contentText,
  handleClose,
  handleSubmit,
}) => {
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const value = formJson[name];
    handleSubmit?.(value);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          {contentText && <DialogContentText>{contentText}</DialogContentText>}
          <form onSubmit={onSubmit} id='edit-form'>
            <TextField
              autoFocus
              required
              margin='dense'
              id={name}
              name={name}
              label={label}
              type={type}
              fullWidth
              defaultValue={defaultValue}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button type='submit' form='edit-form'>
            Actualizar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
