import React, { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { fetchResults, onLoadMore } from '../app/resultsSlice'
import BookCard from './BookCard'

const Results: FC = () => {

    const results = useAppSelector(state => state.results.results)
    const resultsInfo = useAppSelector(state => state.results.resultsInfo)
    const total = useAppSelector(state => state.results.total)
    const startIndex = useAppSelector(state => state.results.startIndex)
    const dispatch = useAppDispatch()

    const loadMore = () => {
        dispatch(onLoadMore())
        dispatch(fetchResults())
    }

    return (

        <div className='results' >
            <div className="container">
                <div className='info-label'>{resultsInfo}</div>
                <div className="book-cards">
                    {
                        results.map(result => (
                            <BookCard key={result.id} book={result} />
                        ))
                    }
                </div>
                {
                    (total < 30 || startIndex > total) ? null :
                        <button className='btn load-btn' onClick={loadMore}>Load more</button>
                }
            </div>
        </div >
    )
}

export default Results
