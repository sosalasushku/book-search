import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { book } from '../types/types'

type bookPageProps = {
    b: book
}

const BookPage: FC<bookPageProps> = ({ b }) => {

    const { title, authors, imageLinks, categories, description } = b.volumeInfo

    return (
        <div className="book-page-bg page">
            <div className='container'>
                <div className="book-page">
                    <div>
                        {
                            imageLinks ? <img src={imageLinks.thumbnail} alt={title} /> : <div className="img-placeholder">No Image</div>
                        }
                    </div>

                    <div className="text">
                        <div className='title'>{title}</div>
                        {
                            authors ?
                                <div className="authors">
                                    <span className="authors-label">Authors: </span>
                                    {
                                        authors?.map(a => (
                                            <span className='author'>{a}</span>
                                        ))
                                    }
                                </div> : ''
                        }
                        {
                            categories?.map(c => (
                                <span className='category'>{c}</span>
                            ))
                        }
                        {
                            description ? <div>{description}</div> : ''
                        }
                    </div>

                </div>

            </div>
            <Link className="back-btn" to='/'>🡠 Back</Link>
        </div>

    )
}

export default BookPage
