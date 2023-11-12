import { createAction } from '@reduxjs/toolkit';

export const changeGenre = createAction<{genre: string}>('catalog/changeGenre');
export const getListFilmsByGenre = createAction('catalog/getListFilmsByGenre');
