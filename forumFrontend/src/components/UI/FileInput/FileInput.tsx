import { ChangeEventHandler, FC, useState } from 'react';

import {
  Button,
  ButtonProps,
  OutlinedInput,
  OutlinedInputProps,
} from '@mui/material';

interface Props {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  multiple?: boolean;
  buttonProps?: ButtonProps;
  buttonText: string;
}

const FileInput: FC<OutlinedInputProps & Props> = ({
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
    <OutlinedInput
      disabled
      value={filenames.join(', ')}
      placeholder={multiple ? 'Файлы не выбраны' : 'Файл не выбран'}
      {...attributes}
      sx={{ pr: 0 }}
      endAdornment={
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
      }
    />
  );
};

export default FileInput;
