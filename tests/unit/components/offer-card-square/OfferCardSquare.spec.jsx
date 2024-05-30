import { render, screen } from '@testing-library/react'
import OfferCardSquare from '~/components/offer-card-square/OfferCardSquare'

vi.mock('react-router-dom', () => ({
  Link: ({ 'data-testid': dataTestId, to, children }) => {
    return (
      <a data-testid={dataTestId} href={to}>
        {children}
      </a>
    )
  }
}))

vi.mock('@mui/material/Avatar', () => ({
  default: ({ src }) => {
    return <img data-testid='avatar' src={src} />
  }
}))

vi.mock('~/components/title-with-description/TitleWithDescription', () => ({
  default: ({ title, description }) => (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  )
}))

vi.mock('~/components/app-chip/AppChip', () => ({
  default: ({ children }) => <span>{children}</span>
}))

vi.mock('~/components/app-button/AppButton', () => ({
  default: ({ children }) => <button>{children}</button>
}))

const offerMock = {
  price: 75,
  proficiencyLevel: ['Beginner', 'Professional'],
  title: 'Advanced Quantum Mechanics: Theoretical Mathematics',
  languages: ['English'],
  authorRole: 'tutor',
  author: {
    _id: '663c8370d22473807999634d',
    firstName: 'Jennifer',
    lastName: 'Wilsonsontelberg',
    totalReviews: {
      student: 0,
      tutor: 0
    },
    averageRating: {
      student: 0,
      tutor: 0
    },
    photo: 'author.png'
  },
  subject: {
    name: 'Ukrainian'
  },
  category: {
    appearance: {
      color: '#79B260'
    }
  }
}

describe('OfferCardSquare component', () => {
  it("should render author's first name", () => {
    render(<OfferCardSquare offer={offerMock} />)

    const authorFullName = screen.getByTestId('authorFullName')
    const { firstName } = offerMock.author

    expect(authorFullName).toHaveTextContent(firstName)
  })

  it("should render author's last name", () => {
    render(<OfferCardSquare offer={offerMock} />)

    const { lastName } = offerMock.author
    const authorFullName = screen.getByTestId('authorFullName')

    expect(authorFullName).toHaveTextContent(lastName)
  })

  it("should render offer's title", () => {
    render(<OfferCardSquare offer={offerMock} />)

    const { title } = offerMock
    const offerTitle = screen.getByText(title)

    expect(offerTitle).toBeInTheDocument()
  })

  it("should render author's spoken languages", () => {
    render(<OfferCardSquare offer={offerMock} />)

    const firstLanguage = screen.getByText('English')
    const secondLanguage = screen.getByText('Ukrainian')

    expect(firstLanguage).toBeInTheDocument()
    expect(secondLanguage).toBeInTheDocument()
  })

  it("should render author's avatar", () => {
    render(<OfferCardSquare offer={offerMock} />)

    const { photo } = offerMock.author
    const avatar = screen.getByTestId('avatar')

    expect(avatar).toBeInTheDocument()
    expect(avatar).toHaveAttribute('src', photo)
  })

  it("should render offer's subject", () => {
    render(<OfferCardSquare offer={offerMock} />)

    const { name } = offerMock.subject
    const subject = screen.getByText(name)

    expect(subject).toBeInTheDocument()
  })

  it('should render price in UAH', () => {
    render(<OfferCardSquare offer={offerMock} />)

    const { price } = offerMock
    const priceElement = screen.getByText(`${price} common.uah`)

    expect(priceElement).toBeInTheDocument()
  })

  it('should render correct singular review form if authorRole is tutor', () => {
    const mock = {
      ...offerMock,
      author: {
        ...offerMock.author,
        totalReviews: {
          tutor: 1
        }
      }
    }
    render(<OfferCardSquare offer={mock} />)

    const reviewElement = screen.getByText(
      'tutorProfilePage.reviews.reviewsCount_one'
    )

    expect(reviewElement).toBeInTheDocument()
  })

  it('should render correct singular review form if authorRole is student', () => {
    const mock = {
      ...offerMock,
      authorRole: 'student',
      author: {
        ...offerMock.author,
        totalReviews: {
          student: 1
        }
      }
    }
    render(<OfferCardSquare offer={mock} />)

    const reviewElement = screen.getByText(
      'tutorProfilePage.reviews.reviewsCount_one'
    )

    expect(reviewElement).toBeInTheDocument()
  })

  it('should render correct plural review form if authorRole is tutor', () => {
    const mock = {
      ...offerMock,
      author: {
        ...offerMock.author,
        totalReviews: {
          tutor: 2
        }
      }
    }
    render(<OfferCardSquare offer={mock} />)

    const reviewElement = screen.getByText(
      'tutorProfilePage.reviews.reviewsCount_other'
    )

    expect(reviewElement).toBeInTheDocument()
  })

  it('should render correct plural review form if authorRole is student', () => {
    const mock = {
      ...offerMock,
      authorRole: 'student',
      author: {
        ...offerMock.author,
        totalReviews: {
          student: 2
        }
      }
    }
    render(<OfferCardSquare offer={mock} />)

    const reviewElement = screen.getByText(
      'tutorProfilePage.reviews.reviewsCount_other'
    )

    expect(reviewElement).toBeInTheDocument()
  })

  it('should transform integer average rating correctly | 3 -> 3.0', () => {
    const mock = {
      ...offerMock,
      author: {
        ...offerMock.author,
        averageRating: {
          tutor: 3
        }
      }
    }
    render(<OfferCardSquare offer={mock} />)

    const averageRating = screen.getByText('3.0')

    expect(averageRating).toBeInTheDocument()
  })

  it("should render author's avarage rating", () => {
    const mock = {
      ...offerMock,
      author: {
        ...offerMock.author,
        averageRating: {
          tutor: 3.5
        }
      }
    }
    render(<OfferCardSquare offer={mock} />)

    const { tutor } = mock.author.averageRating
    const averageRating = screen.getByText(tutor)

    expect(averageRating).toBeInTheDocument()
  })

  it('should render proficiencyLevel with array of one value', () => {
    const mock = {
      ...offerMock,
      proficiencyLevel: ['Beginner']
    }
    render(<OfferCardSquare offer={mock} />)

    const levelElement = screen.getByText('Beginner')

    expect(levelElement).toBeInTheDocument()
  })

  it('should render proficiencyLevel with array of many values', () => {
    const mock = {
      ...offerMock,
      proficiencyLevel: ['Beginner', 'Professional']
    }
    render(<OfferCardSquare offer={mock} />)

    const levelElement = screen.getByText('Beginner - Professional')

    expect(levelElement).toBeInTheDocument()
  })
})
