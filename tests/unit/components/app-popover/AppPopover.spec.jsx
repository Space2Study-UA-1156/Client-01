import { fireEvent, render, screen } from '@testing-library/react'
import AppPopover from '~/components/app-popover/AppPopover'

describe('AppPopover component test', () => {
  it('should imitate click on the showMoreElem and open popover', () => {
    render(
      <AppPopover
        showMoreElem={<button data-testid='show-more' />}
      ></AppPopover>
    )
    const showMoreElem = screen.getByTestId('show-more')

    expect(screen.queryByTestId('app-popover')).toBeNull()
    expect(showMoreElem).toBeInTheDocument()
    fireEvent.click(showMoreElem)
    expect(screen.queryByTestId('app-popover')).toBeInTheDocument()
  })
  it('should imitate Escape key press and close popover', () => {
    render(
      <AppPopover
        showMoreElem={<button data-testid='show-more' />}
      ></AppPopover>
    )
    fireEvent.click(screen.getByTestId('show-more'))
    expect(screen.queryByTestId('app-popover')).toBeInTheDocument()
    fireEvent.keyDown(screen.queryByTestId('app-popover'), {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
      charCode: 27
    })
    expect(screen.queryByTestId('app-popover')).not.toBeInTheDocument()
  })
  it('showMoreElem should not be visible after click', () => {
    render(
      <AppPopover
        hideElem
        showMoreElem={<button data-testid='show-more' />}
      ></AppPopover>
    )
    const showMoreElem = screen.getByTestId('show-more')

    expect(showMoreElem).toBeInTheDocument()
    fireEvent.click(showMoreElem)
    expect(showMoreElem).not.toBeVisible()
  })
  it('showMoreElem should be visible after click', () => {
    render(
      <AppPopover
        showMoreElem={<button data-testid='show-more' />}
      ></AppPopover>
    )
    const showMoreElem = screen.getByTestId('show-more')

    expect(showMoreElem).toBeInTheDocument()
    fireEvent.click(showMoreElem)
    expect(showMoreElem).toBeVisible()
  })
})
