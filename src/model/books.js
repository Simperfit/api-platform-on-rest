import React from 'react';
import { List, Edit, Create, Datagrid, TextField, EditButton, DisabledInput, TextInput, ReferenceManyField, ChipField, SingleFieldList } from 'admin-on-rest/lib/mui';

export const BookList = (props) => (
<List {...props}>
    <Datagrid>
        <TextField label="uuid" source="uuid" />
        <TextField label="name" source="name" />
        <ReferenceManyField label="Reviews by" reference="reviews" target="reviews">
            <SingleFieldList>
                <ChipField source="name" />
            </SingleFieldList>
        </ReferenceManyField>
        <EditButton />
    </Datagrid>
</List>
);

const BookTitle = ({ record }) => {
    return <span>Book {record ? `"${record.name}"` : ''}</span>;
};

export const BookEdit = (props) => (
<Edit title={BookTitle} {...props}>
    <DisabledInput label="uuid" source="uuid" />
    <TextInput label="Name" source="name" />
    </Edit>
);

export const BookCreate = (props) => (
<Create {...props}>
    <TextInput label="Name" source="name" />
    </Create>
);
