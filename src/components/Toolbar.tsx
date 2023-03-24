import React from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { onChangeQuery, onChangeCategory, onChangeSorting, searchByQuery, fetchResults } from '../app/resultsSlice'

import { Select, MenuItem, TextField } from '@mui/material'


const Toolbar = () => {

    const category = useAppSelector(state => state.results.category)
    const sorting = useAppSelector(state => state.results.sorting)
    const dispatch = useAppDispatch()

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') dispatch(search)
    }

    const search = () => {
        dispatch(searchByQuery())
        dispatch(fetchResults())
    }

    return (
        <div className="toolbar-bg page">
            <div className="container">
                <div className="heading">Search for books you need!</div>
                <div className="toolbar">
                    <div className="search">
                        <TextField
                            id="outlined-basic"
                            label="What are you looking for?"
                            variant="outlined"
                            onChange={e => dispatch(onChangeQuery(e.target.value))}
                            onKeyDown={e => handleKeyDown(e)}
                        />
                    </div>
                    <div className="config">
                        <div className="config-item">
                            <div className='select-label'>Category:</div>
                            <Select name="category" defaultValue={category} size='small' onChange={e => dispatch(onChangeCategory(e.target.value))}>
                                <MenuItem value="all">All</MenuItem>
                                <MenuItem value="art">Art</MenuItem>
                                <MenuItem value="biography">Biography</MenuItem>
                                <MenuItem value="computers">Computers</MenuItem>
                                <MenuItem value="history">History</MenuItem>
                                <MenuItem value="medical">Medical</MenuItem>
                                <MenuItem value="poetry">Poetry</MenuItem>
                            </Select>
                        </div>
                        <div className="config-item">
                            <div className='select-label'>Sort by:</div>
                            <Select name="sorting" defaultValue={sorting} size='small' onChange={e => dispatch(onChangeSorting(e.target.value))}>
                                <MenuItem value="relevance">Relevance</MenuItem>
                                <MenuItem value="newest">Newest</MenuItem>
                            </Select>
                        </div>
                    </div>
                    <button onClick={search} className='search-btn btn'>Search</button>
                </div>
            </div>
        </div>
    )
}

export default Toolbar
