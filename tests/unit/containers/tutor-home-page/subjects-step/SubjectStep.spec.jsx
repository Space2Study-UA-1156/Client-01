import { renderWithProviders } from '~tests/test-utils'
import { fireEvent, screen } from '@testing-library/react'
import { vi } from 'vitest'

import SubjectsStep from '~/containers/tutor-home-page/subjects-step/SubjectsStep'
import { interests } from '~/components/user-steps-wrapper/constants'
import { student } from '~/constants'
import { useStepContext } from '~/context/step-context'

const newSubject = { name: 'New Subject' }
const mockSubjects = [{ name: 'Subject1' }, { name: 'Subject2' }]
const mockHandleStepData = vi.fn()

vi.mock('~/hooks/use-breakpoints', () => ({
  default: () => ({
    isLaptopAndAbove: true,
    isMobile: false
  })
}))

vi.mock('react-redux', async (importOriginal) => {
  const module = await importOriginal()

  return {
    ...module,
    useSelector: () => ({ userRole: student })
  }
})

vi.mock('~/context/step-context', async (importOriginal) => {
  const module = await importOriginal()

  return {
    ...module,
    useStepContext: vi.fn(() => ({
      stepData: { [interests]: [...mockSubjects] },
      handleStepData: mockHandleStepData
    }))
  }
})

vi.mock('~/components/async-autocomlete/AsyncAutocomplete', () => ({
  default: ({ onChange, textFieldProps }) => (
    <input
      data-testid={textFieldProps.label}
      onChange={() => onChange(null, newSubject)}
    />
  )
}))

vi.mock('~/components/app-button/AppButton', () => ({
  default: ({ onClick }) => (
    <button data-testid='add-category-btn' onClick={onClick} />
  )
}))

vi.mock('~/components/app-chips-list/AppChipList', () => ({
  default: ({ items, handleChipDelete }) => {
    return (
      <div>
        {items.map((item, index) => (
          <div key={index} onClick={() => handleChipDelete(item)}>
            {item}
          </div>
        ))}
      </div>
    )
  }
}))

describe('SubjectStep component', () => {
  const btnsBox = (
    <>
      <button data-testid='btn1' />
      <button data-testid='btn2' />
    </>
  )

  beforeEach(() => {
    renderWithProviders(<SubjectsStep btnsBox={btnsBox} />)
  })

  it('renders correctly', () => {
    const element = screen.getByText('becomeTutor.categories.title')

    expect(element).toBeInTheDocument()
  })

  it('should render props buttons', () => {
    expect(screen.getByTestId('btn1')).toBeInTheDocument()
    expect(screen.getByTestId('btn2')).toBeInTheDocument()
  })

  it('should render all autocompletes', () => {
    const categoriesInput = screen.getByTestId(
      'becomeTutor.categories.mainSubjectsLabel'
    )
    const subjectsInput = screen.getByTestId(
      'becomeTutor.categories.subjectLabel'
    )

    expect(categoriesInput).toBeInTheDocument()
    expect(subjectsInput).toBeInTheDocument()
  })

  it('should render Add button', () => {
    expect(screen.getByTestId('add-category-btn')).toBeInTheDocument()
  })

  it('should render all subjects', () => {
    expect(screen.getByText('Subject1')).toBeInTheDocument()
    expect(screen.getByText('Subject2')).toBeInTheDocument()
  })

  it('should delete subject', () => {
    const firstSubject = mockSubjects[0].name
    const subject = screen.getByText(firstSubject)

    fireEvent.click(subject)

    expect(mockHandleStepData).toHaveBeenCalledWith(interests, [
      ...mockSubjects.filter((item) => item.name !== firstSubject)
    ])
  })

  it('should add subject', () => {
    const addButton = screen.getByTestId('add-category-btn')
    const subjectsInput = screen.getByTestId(
      'becomeTutor.categories.subjectLabel'
    )
    mockHandleStepData.mockClear()

    fireEvent.change(subjectsInput, { target: { value: 'test' } })
    fireEvent.click(addButton)

    expect(mockHandleStepData).toHaveBeenCalledWith(interests, [
      ...mockSubjects,
      newSubject
    ])
  })

  it('should not add the similar subject twice', () => {
    useStepContext.mockReturnValue({
      stepData: { [interests]: [...mockSubjects, newSubject] },
      handleStepData: mockHandleStepData
    })
    const addButton = screen.getByTestId('add-category-btn')
    const subjectsInput = screen.getByTestId(
      'becomeTutor.categories.subjectLabel'
    )
    mockHandleStepData.mockClear()

    fireEvent.change(subjectsInput, { target: { value: 'test' } })
    fireEvent.click(addButton)

    expect(mockHandleStepData).not.toHaveBeenCalled()
  })

  it('should clear the subject input if the category input changed', () => {
    const addButton = screen.getByTestId('add-category-btn')
    const subjectsInput = screen.getByTestId(
      'becomeTutor.categories.subjectLabel'
    )
    const categoriesInput = screen.getByTestId(
      'becomeTutor.categories.mainSubjectsLabel'
    )
    mockHandleStepData.mockClear()

    fireEvent.change(subjectsInput, { target: { value: 'test' } })
    fireEvent.change(categoriesInput, { target: { value: 'test' } })
    fireEvent.click(addButton)

    expect(mockHandleStepData).not.toHaveBeenCalled()
  })
})
