import React, { FC } from 'react'
import { BookProps } from '../types/types'
import { Link } from 'react-router-dom'
import { setCurrentBook } from '../app/resultsSlice'
import { useAppDispatch } from '../app/hooks'

const BookCard: FC<BookProps> = ({ book }) => {

    const dispatch = useAppDispatch()
    const bookInfo = book.volumeInfo

    return (
        <Link to={`/${book.id}`} className='book-card' onClick={() => dispatch(setCurrentBook(book))}>

            {
                bookInfo.imageLinks ? <img src={bookInfo.imageLinks?.thumbnail} alt="" /> : <div className='img-placeholder'>No Image</div>
            }

            <div className="book-card-text text">
                <div className="card-style authors">
                    {
                        bookInfo.authors?.map((author: string) => (
                            <span className='card-style author'>{author}</span>
                        )) || null
                    }
                </div>
                <div className='card-style title'>{bookInfo.title || 'Unknown title'}</div>
                {
                    bookInfo.categories ? <div className='card-style category'>{bookInfo.categories[0]}</div> : null
                }
            </div>
        </Link>
    )
}

export default BookCard
