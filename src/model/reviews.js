import React from 'react';
import { List, Edit, Create, Datagrid, ReferenceField, TextField, EditButton, DisabledInput, LongTextInput, ReferenceInput, SelectInput, TextInput } from 'admin-on-rest/lib/mui';

export const ReviewList = (props) => (
<List {...props}>
    <Datagrid>
        <TextField label="uuid" source="uuid" />
        <TextField label="contents" source="contents" />
        <EditButton />
    </Datagrid>
</List>
);

const ReviewTitle = ({ record }) => {
    return <span>Review {record ? `"${record.name}"` : ''}</span>;
};

export const ReviewEdit = (props) => (
<Edit title={ReviewTitle} {...props}>
    <DisabledInput label="uuid" source="uuid" />
    <TextInput label="contents" source="contents" />
    <TextInput label="published" source="published" />

</Edit>
);

export const ReviewCreate = (props) => (
<Create {...props}>
    <TextInput label="contents" source="contents" />
    <TextInput label="published" source="published" />
</Create>
);
