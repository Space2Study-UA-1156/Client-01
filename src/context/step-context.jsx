import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect
} from 'react'
import { useSelector } from 'react-redux'

const StepContext = createContext()

const languageStepInitialValues = {
  data: {
    language: null
  },
  errors: {
    language: ''
  }
}

const StepProvider = ({ children, initialValues, stepLabels }) => {
  const { firstName, lastName } = useSelector((state) => state.appMain)

  const [generalData, setGeneralData] = useState({
    data: {
      ...initialValues,
      firstName: firstName || initialValues.firstName,
      lastName: lastName || initialValues.lastName,
      message: initialValues.message || ''
    },
    errors: {
      firstName: '',
      lastName: '',
      professionalSummary: ''
    }
  })

  const [subject, setSubject] = useState([])
  const [language, setLanguage] = useState(languageStepInitialValues)
  const [photo, setPhoto] = useState([])
  const [generalLabel, subjectLabel, languageLabel, photoLabel] = stepLabels
  const [isNextDisabled, setIsNextDisabled] = useState(true)
  const [isOverEighteen, setIsOverEighteen] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)

  const stepData = {
    [generalLabel]: generalData,
    [subjectLabel]: subject,
    [languageLabel]: language,
    [photoLabel]: photo
  }

  const handleOverEighteenChange = useCallback((value) => {
    setIsOverEighteen(value)
  }, [])

  const handleStepData = useCallback(
    (stepLabel, newData, newErrors = {}) => {
      switch (stepLabel) {
        case generalLabel:
          setGeneralData((prevState) => ({
            data: { ...prevState.data, ...newData },
            errors: { ...prevState.errors, ...newErrors }
          }))
          break
        case subjectLabel:
          setSubject(newData)
          break
        case languageLabel:
          setLanguage((prevState) => ({
            data: { ...prevState.data, ...newData },
            errors: { ...prevState.errors, ...newErrors }
          }))
          break
        case photoLabel:
          setPhoto(newData)
          break
        default:
          break
      }
    },
    [generalLabel, subjectLabel, languageLabel, photoLabel]
  )

  const toggleNextButton = useCallback((disabled) => {
    setIsNextDisabled(disabled)
  }, [])

  const setFormValidation = useCallback((isValid) => {
    setIsFormValid(isValid)
  }, [])

  useEffect(() => {
    setGeneralData((prevState) => ({
      ...prevState,
      data: {
        ...prevState.data,
        firstName,
        lastName
      }
    }))
  }, [firstName, lastName])

  useEffect(() => {}, [generalData])

  return (
    <StepContext.Provider
      value={{
        stepData,
        stepLabels,
        handleStepData,
        isNextDisabled,
        toggleNextButton,
        isOverEighteen,
        handleOverEighteenChange,
        setFormValidation,
        isFormValid,
        generalData,
        setGeneralData
      }}
    >
      {children}
    </StepContext.Provider>
  )
}

const useStepContext = () => {
  const context = useContext(StepContext)
  if (!context) {
    throw new Error('useStepContext must be used within a StepProvider')
  }
  return context
}

export { StepProvider, useStepContext }
