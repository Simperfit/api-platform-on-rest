import React from 'react';

import { jsonServerRestClient, Admin, Resource } from 'admin-on-rest'
import restClient from './restClient'
import { BookList, BookEdit, BookCreate } from './model/books'
import { ReviewCreate, ReviewEdit, ReviewList } from './model/reviews'

const App = () => (
<Admin restClient={restClient}>
    <Resource name="books" list={BookList} edit={BookEdit} create={BookCreate} />
    <Resource name="reviews" list={ReviewList} edit={ReviewEdit} create={ReviewCreate} />

</Admin>
);

export default App;
