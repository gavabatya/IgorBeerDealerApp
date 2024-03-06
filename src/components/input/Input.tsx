import { useController, UseControllerProps } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { TextFieldProps } from '@mui/material/TextField/TextField';
import { makeStyles } from '@mui/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';
import {useState} from "react";

type Props<T> = TextFieldProps & {
    // @ts-ignore
    controller: UseControllerProps<T>;
  inputType?: 'password';
};

const useStyles = makeStyles(() => ({
  input: {
    '& label.Mui-focused': {
      color: 'black',
    },

    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        color: 'black',
        borderColor: '#ffcc33',
      },
    },
  },
}));

export function Input<T extends object>({ inputType, controller, ...otherProps }: Props<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const [currentValue, setCurrentValue] = useState('');
  const [focused, setFocused] = useState(false);
  const classes = useStyles();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const {
    field: { onChange, onBlur, name: fieldName, value, ref },
    fieldState: { invalid, error },
  } = useController(controller);

  const getType = () => {
    if (inputType === 'password') {
      return showPassword ? 'text' : 'password';
    }

    return otherProps.type;
  };

  const customType = getType();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCurrentValue(event.target.value);
    onChange(event);
  };

  return (
    <TextField
      className={classes.input}
      type={customType}
      fullWidth
      InputProps={
        inputType === 'password'
          ? {
              startAdornment: (
                <InputAdornment position="end" sx={{ position: 'absolute', right: 14 }}>
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : undefined
      }
      InputLabelProps={{
        shrink: focused || currentValue !== '',
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => {
        setFocused(false);
        onBlur();
      }}
      onChange={handleChange}
      value={value}
      name={fieldName}
      inputRef={ref}
      {...otherProps}
      helperText={error?.message}
      error={invalid}
    />
  );
}
