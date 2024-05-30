import { screen, render } from '@testing-library/react'
import CardList from '~/components/card-list/CardList'

const data = [
  { id: 1, name: 'card1' },
  { id: 2, name: 'card2' },
  { id: 3, name: 'card3' }
]
const cardsMock = data.map((card) => (
  <div data-testid='card' key={card.id}>
    {card.name}
  </div>
))

describe('CardList component', () => {
  beforeEach(() => {
    render(<CardList cards={cardsMock} />)
  })

  it('should render cards', () => {
    const cards = screen.getAllByTestId('card')
    const expectedLength = data.length

    expect(cards).toHaveLength(expectedLength)
  })
})
