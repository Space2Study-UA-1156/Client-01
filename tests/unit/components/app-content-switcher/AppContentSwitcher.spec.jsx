import { render, screen, fireEvent } from '@testing-library/react'
import AppContentSwitcher from '~/components/app-content-switcher/AppContentSwitcher'

describe('AppContentSwitcher tests', () => {
  const switchOptions = {
      left: { text: 'Left Text', tooltip: 'Left Tooltip' },
      right: { text: 'Right Text', tooltip: 'Right Tooltip' }
    }

  it('Should render correctly with props', () => {
    render(
      <AppContentSwitcher
        active={false}
        onChange={() => {}}
        styles={{}}
        switchOptions={switchOptions}
        typographyVariant='body1'
      />
    )

    const leftTextElement = screen.getByText('Left Text')
    const rightTextElement = screen.getByText('Right Text')

    expect(leftTextElement).toBeInTheDocument()
    expect(rightTextElement).toBeInTheDocument()
  })

  it('Should call the function "onChange" when it was clicked on the switch', () => {
    const onChangeMock = vi.fn()

    const { getByTestId } = render(
      <AppContentSwitcher
        active={false}
        onChange={onChangeMock}
        switchOptions={switchOptions}
        typographyVariant='body1'
      />
    )

    const switchElement = getByTestId('switch')
    fireEvent.click(switchElement)
    assert(() => {
      expect(onChangeMock).toHaveBeenCalled()
    })
  })

  it('Should render tooltips if the tooltips props are passed', () => {
    render(
      <AppContentSwitcher
        active={false}
        onChange={() => {}}
        styles={{}}
        switchOptions={switchOptions}
        typographyVariant='body1'
      />
    )

    const leftTooltipIcon = screen.getByLabelText('Left Tooltip')
    const rightTooltipIcon = screen.getByLabelText('Right Tooltip')

    expect(leftTooltipIcon).toBeInTheDocument()
    expect(rightTooltipIcon).toBeInTheDocument()
  })
})