import {
    SelectArrayInput,
    Create,
    ReferenceArrayInput,
    SimpleForm,
    TextInput,
    useCreate,
    useCreateSuggestionContext,
    UseCreateOptions,
    CreateParams,
    SupportCreateSuggestionOptions,
    UseCreateMutateParams
} from 'react-admin';

import {
    Box,
    BoxProps,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    TextField,
    Typography,
    Stack
} from '@mui/material';
import React, { SyntheticEvent } from 'react';
import { GetColorName } from 'hex-color-to-color-name';
import { type } from 'os';

type Props = {
    reference: string,
    params?: CreateParams,
    options?: UseCreateOptions
}

export default function CreateModal({ reference, params, options }: Props) {
    const { filter, onCancel, onCreate } = useCreateSuggestionContext();
    const [newId, setNewId] = React.useState<string>('')
    const [value, setValue] = React.useState<string>(filter || '');
    const [create] = useCreate();

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        const newFilter = reference === 'color'
            ? {
                id: newId,
                label: value
            } : {
                label: value
            }
        create(
            reference,
            {
                data: newFilter
            },
            {
                ...options,
                onSuccess: (data) => {
                    setValue("")
                    onCreate(data)
                },
                onError: (error) => {
                    console.log("CREATEMODEL", error)
                }
            })
    };

    function handleIdOnchange(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
        setNewId(e.target.value)
        if (reference === 'color') {
            const colorName = GetColorName(e.target.value)
            if (!colorName.match(/^Invalid Color:\s*\d+\s*/)) setValue(colorName)
        }
    }

    return (
        <Dialog open onClose={onCancel}>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <Stack gap={2}>
                        <Typography>New - {reference}</Typography>
                        {reference === 'color' && <TextField
                            label={`${reference} - hex`}
                            value={newId}
                            onChange={handleIdOnchange}
                            autoFocus
                        />}
                        <TextField
                            label={`${reference} - Label`}
                            value={value}
                            onChange={event => setValue(event.target.value)}
                            autoFocus
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button type="submit">Save</Button>
                    <Button onClick={onCancel}>Cancel</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}