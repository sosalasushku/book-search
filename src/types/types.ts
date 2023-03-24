export type category = 'all' | 'art' | 'biography' | 'computers' | 'history' | 'medical' | 'poetry'

export type sorting = 'relevance' | 'newest'

export type imageLinks = {
    thumbnail: string,
    smallThumbnail?: string
}

export type bookInfo = {
    id: number,
    title?: string,
    authors?: string[],
    categories?: string[],
    imageLinks?: imageLinks,
    description?: string,
}

export type book = {
    id: number,
    volumeInfo: bookInfo
}

export type BookProps = {
    book: book,
    key: number
}