interface User {
  id: string
  email: string
  name: string
  avatarUrl: string
}

interface Author {
  id: string
  name: string
}

interface Book {
  id: string
  title: string
  author: Author
  description: string
  coverUrl: string
  rating: 0 | 1 | 2 | 3 | 4 | 5
}

interface Assessment {
  id: string
  user: User
  book: Book
  rating: 0 | 1 | 2 | 3 | 4 | 5
  createAt: string
}
