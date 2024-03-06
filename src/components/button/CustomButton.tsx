import React, { FC, ReactElement } from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

type Props = ButtonProps & {
  title: string;
  icon?: ReactElement;
};

const useStyles = makeStyles(() => ({
  btn: {
    backgroundColor: '#f8d9a3 !important',
    color: 'black !important',
    height: '42px !important',
    display: 'flex !important',
    gap: '10px',

    '&:hover': {
      backgroundColor: '#ffcc33 !important',
    },
  },
}));

export const CustomButton: FC<Props> = ({ title, icon, ...otherProps }) => {
  const styles = useStyles();

  return (
    <Button
      sx={{ opacity: otherProps.disabled ? 0.4 : 1 }}
      fullWidth
      className={styles.btn}
      {...otherProps}
    >
      <>
        {title} {icon}
      </>
    </Button>
  );
};
