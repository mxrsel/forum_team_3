import { ChangeEventHandler, FC, useState } from 'react';

import { Button, ButtonProps, TextField, TextFieldProps } from '@mui/material';

interface Props {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  multiple?: boolean;
  buttonProps?: ButtonProps;
  buttonText: string;
}

const FileInput: FC<TextFieldProps & Props> = ({
  buttonProps,
  buttonText,
  multiple,
  name,
  onChange,
  ...attributes
}) => {
  const [filenames, setFilenames] = useState<string[]>([]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      setFilenames([...e.target.files].map((x) => x.name));
    } else {
      setFilenames([]);
    }

    if (onChange) {
      onChange(e);
    }
  };

  return (
    <TextField
      disabled
      value={filenames.join(', ')}
      {...attributes}
      sx={{
        '& .MuiInputBase-root': {
          pr: 0,
        },
      }}
      slotProps={{
        input: {
          endAdornment: (
            <Button
              disableElevation
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              {...buttonProps}
            >
              {buttonText}
              <input
                hidden
                type="file"
                name={name}
                onChange={handleChange}
                multiple={multiple}
              />
            </Button>
          ),
        },
      }}
    />
  );
};

export default FileInput;
