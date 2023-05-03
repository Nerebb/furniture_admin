import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Menu } from 'react-admin';
import { CircularProgress, SxProps, Theme } from '@mui/material';

type choice = {
    id: string
    label: string
}

type Props = {
    inputLabel: string
    choices?: choice[]
    onChange?: (e: SelectChangeEvent) => void
    sx?: SxProps<Theme>
}

export default function CusSelectInput({ choices, inputLabel, onChange, sx }: Props) {
    const [selected, setSelected] = React.useState<choice['id']>('');

    const handleChange = (event: SelectChangeEvent) => {
        setSelected(event.target.value);
        if (onChange) onChange(event)
    };

    return (
        <FormControl sx={sx} variant='outlined'>
            <InputLabel id="demo-select-small-label">{inputLabel}</InputLabel>
            <Select
                value={selected}
                label={inputLabel}
                onChange={handleChange}
            >
                {choices ? choices.map(choice => (
                    <MenuItem key={`${inputLabel}-${choice.id}`} value={choice.id}>{choice.label}</MenuItem>
                )) : (
                    <CircularProgress color="inherit" />
                )}

            </Select>
        </FormControl>
    );
}