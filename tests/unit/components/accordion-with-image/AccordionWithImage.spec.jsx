import { vi } from 'vitest'
import { fireEvent, screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import AccordionWithImage from '~/components/accordion-with-image/AccordionWithImage'

vi.mock('~/components/accordion/Accordions', () => ({
  __esModule: true,
  default: ({ items, activeIndex, onChange }) => {
    return (
      <div>
        {items.map((item, index) => (
          <button key={index} onClick={() => onChange(index)}>
            {item.title}
          </button>
        ))}
        <div>{items[activeIndex].description}</div>
      </div>
    )
  }
}))

describe('AccordionWithImage test', () => {
  const items = [
    { title: 'title1', description: 'description1', image: 'image1' },
    { title: 'title2', description: 'description2', image: 'image2' }
  ]

  beforeEach(() => {
    renderWithProviders(<AccordionWithImage items={items} />)
  })

  it('Description2 should not render before click', () => {
    const description2 = screen.queryByText('description2')
    expect(description2).not.toBeInTheDocument()
  })

  it('Content should be opened when user clicks on title2', () => {
    const title2 = screen.getByText('title2')
    fireEvent.click(title2)
    const description1 = screen.queryByText('description1')
    const description2 = screen.getByText('description2')
    expect(description1).not.toBeInTheDocument()
    expect(description2).toBeInTheDocument()
  })
})
