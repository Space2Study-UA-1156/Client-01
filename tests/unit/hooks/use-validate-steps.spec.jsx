import { renderHook, act } from '@testing-library/react-hooks'
import useValidateSteps from '~/hooks/use-validate-steps'
import { expect, vi } from 'vitest'

const stepLabels = ['General', 'Subjects', 'Language', 'Photo']
const handleStepData = vi.fn()

describe('useValidateSteps', () => {
  it('should validate all steps and return no errors', () => {
    const stepData = {
      [stepLabels[0]]: {
        data: {
          firstName: 'John',
          lastName: 'Doe',
          professionalSummary: 'Lorem ipsum dolor sit amet'
        },
        errors: {}
      },
      [stepLabels[1]]: [],
      [stepLabels[2]]: {
        data: {
          language: 'English'
        },
        errors: {}
      },
      [stepLabels[3]]: []
    }
    const { result } = renderHook(() =>
      useValidateSteps(stepLabels, stepData, handleStepData)
    )

    act(() => {
      const allStepsValid = result.current.validateAllSteps()
      expect(allStepsValid).toBe(true)
    })

    expect(result.current.stepsWithErrors.size).toBe(0)
  })

  it('should validate all steps and return one error for General step', () => {
    const stepData = {
      [stepLabels[0]]: {
        data: {
          firstName: 'John',
          lastName: '',
          professionalSummary: 'Lorem ipsum dolor sit amet'
        },
        errors: {}
      },
      [stepLabels[1]]: [],
      [stepLabels[2]]: {
        data: {
          language: 'English'
        },
        errors: {}
      },
      [stepLabels[3]]: []
    }
    const { result } = renderHook(() =>
      useValidateSteps(stepLabels, stepData, handleStepData)
    )

    act(() => {
      const isStepValid = result.current.validateAllSteps()
      expect(isStepValid).toBe(false)
    })

    expect(result.current.stepsWithErrors.size).toBe(1)
    expect(result.current.stepsWithErrors.has(stepLabels[0])).toBe(true)
  })

  it('should validate all steps and return one error for Language step', () => {
    const stepData = {
      [stepLabels[0]]: {
        data: {
          firstName: 'John',
          lastName: 'Doe',
          professionalSummary: 'Lorem ipsum dolor sit amet'
        },
        errors: {}
      },
      [stepLabels[1]]: [],
      [stepLabels[2]]: {
        data: {
          language: ''
        },
        errors: {}
      },
      [stepLabels[3]]: []
    }
    const { result } = renderHook(() =>
      useValidateSteps(stepLabels, stepData, handleStepData)
    )

    act(() => {
      const isStepValid = result.current.validateAllSteps()
      expect(isStepValid).toBe(false)
    })

    expect(result.current.stepsWithErrors.size).toBe(1)
    expect(result.current.stepsWithErrors.has(stepLabels[2])).toBe(true)
  })

  it('should validate a specific step and return two errors', () => {
    const stepData = {
      [stepLabels[0]]: {
        data: {
          firstName: '',
          lastName: 'Doe',
          professionalSummary: 'Lorem ipsum dolor sit amet'
        },
        errors: {}
      },
      [stepLabels[1]]: [],
      [stepLabels[2]]: {
        data: {
          language: ''
        },
        errors: {}
      },
      [stepLabels[3]]: []
    }
    const { result } = renderHook(() =>
      useValidateSteps(stepLabels, stepData, handleStepData)
    )

    act(() => {
      const isStepValid = result.current.validateAllSteps()
      expect(isStepValid).toBe(false)
    })

    expect(result.current.stepsWithErrors.size).toBe(2)
    expect(result.current.stepsWithErrors.has(stepLabels[0])).toBe(true)
    expect(result.current.stepsWithErrors.has(stepLabels[2])).toBe(true)
  })
})
