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
} from '@mui/material';
import React, { SyntheticEvent } from 'react';

type Props = {
    reference: string,
    params?: CreateParams,
    options?: UseCreateOptions
}

export default function CreateModal({ reference, params, options }: Props) {
    const { filter, onCancel, onCreate } = useCreateSuggestionContext();
    const [value, setValue] = React.useState(filter || '');
    const [create] = useCreate();

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        create(
            reference,
            {
                data: {
                    label: value
                }
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

    return (
        <Dialog open onClose={onCancel}>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <TextField
                        label={`New - ${reference}`}
                        value={value}
                        onChange={event => setValue(event.target.value)}
                        autoFocus
                    />
                </DialogContent>
                <DialogActions>
                    <Button type="submit">Save</Button>
                    <Button onClick={onCancel}>Cancel</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}