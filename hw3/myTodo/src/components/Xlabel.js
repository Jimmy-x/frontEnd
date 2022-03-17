// eslint-disable-next-line filenames/match-exported
import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function Xlabel() {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <FormGroup>
      <FormControlLabel
        control={<Checkbox defaultChecked={true} />}
        label="Label"
      />
      <FormControlLabel
        disabled={true}
        control={<Checkbox />}
        label="Disabled"
      />
    </FormGroup>
  );
}
