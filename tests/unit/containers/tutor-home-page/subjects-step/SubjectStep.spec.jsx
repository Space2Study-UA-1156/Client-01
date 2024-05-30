import { fireEvent, screen } from '@testing-library/react'
import { vi } from 'vitest'
import * as reactRedux from 'react-redux'

import { renderWithProviders } from '~tests/test-utils'
import SubjectsStep from '~/containers/tutor-home-page/subjects-step/SubjectsStep'
import { interests, subjects } from '~/components/user-steps-wrapper/constants'
import { student, tutor } from '~/constants'
import { useStepContext } from '~/context/step-context'
import { subjectService } from '~/services/subject-service'

const id = 'id'
const newSubject = { name: 'New Subject', _id: id }
const mockSubjects = [{ name: 'Subject1' }, { name: 'Subject2' }]
const mockHandleStepData = vi.fn()
const useSelectorMock = vi.spyOn(reactRedux, 'useSelector')
const btnsBox = (
  <>
    <button data-testid='btn1' />
    <button data-testid='btn2' />
  </>
)
const renderComponentWithUserRole = (role, items = [...mockSubjects]) => {
  const subjectLabel = role === student ? interests : subjects
  useSelectorMock.mockReturnValue({ userRole: role })
  useStepContext.mockReturnValue({
    stepData: { [subjectLabel]: items },
    handleStepData: mockHandleStepData
  })
  renderWithProviders(<SubjectsStep btnsBox={btnsBox} />)
}

vi.mock('~/services/category-service')

vi.mock('~/services/subject-service', () => ({
  subjectService: { getSubjectsNames: vi.fn() }
}))

vi.mock('~/context/step-context', async (importOriginal) => {
  const module = await importOriginal()

  return {
    ...module,
    useStepContext: vi.fn()
  }
})

vi.mock('~/hooks/use-breakpoints', () => ({
  default: () => ({
    isLaptopAndAbove: true,
    isMobile: true
  })
}))

vi.mock('~/components/async-autocomlete/AsyncAutocomplete', () => ({
  default: ({ onChange, textFieldProps, service }) => (
    <input
      data-testid={textFieldProps.label}
      onChange={() => {
        onChange(null, newSubject)
        service()
      }}
    />
  )
}))

vi.mock('~/components/app-button/AppButton', () => ({
  default: ({ disabled, onClick }) => (
    <button
      data-testid='add-category-btn'
      disabled={disabled}
      onClick={onClick}
    />
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
  it('renders correctly', () => {
    renderComponentWithUserRole(student)
    const element = screen.getByText('becomeTutor.categories.title')

    expect(element).toBeInTheDocument()
  })

  it('should render props buttons', () => {
    renderComponentWithUserRole(student)

    expect(screen.getByTestId('btn1')).toBeInTheDocument()
    expect(screen.getByTestId('btn2')).toBeInTheDocument()
  })

  it('should render all autocompletes', () => {
    renderComponentWithUserRole(student)
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
    renderComponentWithUserRole(student)

    expect(screen.getByTestId('add-category-btn')).toBeInTheDocument()
  })

  it('should render all subjects for the student role', () => {
    renderComponentWithUserRole(student)

    expect(screen.getByText('Subject1')).toBeInTheDocument()
    expect(screen.getByText('Subject2')).toBeInTheDocument()
  })

  it('should render all subjects for the tutor role', () => {
    renderComponentWithUserRole(tutor)

    expect(screen.getByText('Subject1')).toBeInTheDocument()
    expect(screen.getByText('Subject2')).toBeInTheDocument()
  })

  it('should delete subject', () => {
    renderComponentWithUserRole(student)
    const firstSubject = mockSubjects[0].name
    const subject = screen.getByText(firstSubject)

    fireEvent.click(subject)

    expect(mockHandleStepData).toHaveBeenCalledWith(interests, [
      ...mockSubjects.filter((item) => item.name !== firstSubject)
    ])
  })

  it('should add subject', () => {
    renderComponentWithUserRole(student)
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
    renderComponentWithUserRole(student, [...mockSubjects, newSubject])
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
    renderComponentWithUserRole(student)
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

  it('should call subjectService.getSubjectsNames with correct id', () => {
    subjectService.getSubjectsNames.mockClear()
    renderComponentWithUserRole(student)
    const addButton = screen.getByTestId('add-category-btn')
    const subjectsInput = screen.getByTestId(
      'becomeTutor.categories.subjectLabel'
    )
    const categoriesInput = screen.getByTestId(
      'becomeTutor.categories.mainSubjectsLabel'
    )
    mockHandleStepData.mockClear()

    fireEvent.change(categoriesInput, { target: { value: 'test' } })
    fireEvent.change(subjectsInput, { target: { value: 'test' } })
    fireEvent.click(addButton)

    expect(subjectService.getSubjectsNames).toHaveBeenCalledWith(id)
  })
})
