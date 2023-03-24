import { createSlice, createAsyncThunk, PayloadAction, AnyAction } from '@reduxjs/toolkit'
import { RootState } from './store'
import { book, category, sorting } from '../types/types'
import { stat } from 'fs'

const KEY = 'AIzaSyAXnWwzXfdnm4FgQTRfGPLpU1nWl6b1qxo'
const BASE_URL = `https://www.googleapis.com/books/v1/volumes?q=`

type resultsState = {
    isLoading: boolean,
    isError: boolean,
    query: string,
    results: book[],
    resultsInfo: string,
    total: number,
    startIndex: number,
    category: category,
    sorting: sorting,
    currentBook: book | null,
}

const initialState: resultsState = {
    isLoading: false,
    isError: false,
    query: '',
    results: [],
    resultsInfo: '',
    total: 0,
    startIndex: 0,
    category: 'all',
    sorting: 'relevance',
    currentBook: null,
}

export const fetchResults = createAsyncThunk(
    'results_state/fetchResults',
    async function (_, thunkAPI) {
        const state = thunkAPI.getState() as RootState
        const results = state.results
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${results.query}${results.category === 'all' ? '' : `+subject:${results.category}`}&startIndex=${results.startIndex}&maxResults=30&orderBy=${results.sorting}&key=${KEY}`)
        if (!response) return thunkAPI.rejectWithValue('Error')
        return await response.json()
    }
)

export const resultsSlice = createSlice({
    name: 'results_state',
    initialState,
    reducers: {
        onChangeQuery: (state, action: PayloadAction<string>) => {
            state.query = action.payload
        },
        onChangeCategory: (state, action) => {
            state.category = action.payload
        },
        onChangeSorting: (state, action) => {
            state.sorting = action.payload
        },
        setCurrentBook: (state, action: PayloadAction<book>) => {
            state.currentBook = action.payload
            console.log(state.currentBook.id)
        },
        searchByQuery: (state) => {
            state.startIndex = 0
            state.results = []
        },
        onLoadMore: (state) => {
            state.startIndex += 30
            console.log(`Loaded from ${state.startIndex} to ${state.startIndex + 30}`)
            console.log(state.results)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchResults.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.resultsInfo = ''
            })
            .addCase(fetchResults.fulfilled, (state, action) => {
                state.isLoading = false
                if (state.startIndex === 0) state.total = action.payload.totalItems
                if (action.payload.items) {
                    state.results = [...state.results, ...action.payload.items]
                    state.resultsInfo = `Found ${state.total} results:`
                    console.log('есть длина', action.payload.items.length)
                } else {
                    state.resultsInfo = `No results found.`
                    console.log('нет длина')
                }
                console.log(state.results.length)
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.isLoading = false
                state.isError = true
                state.resultsInfo = 'Error'
            })
    }
})

function isError(action: AnyAction) {
    return action.type.endsWith('rejected')
}

export const { onChangeQuery, onChangeCategory, onChangeSorting, setCurrentBook, searchByQuery, onLoadMore } = resultsSlice.actions

export default resultsSlice.reducer