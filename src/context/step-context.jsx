import { createContext, useCallback, useContext, useState } from 'react'

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
  const [generalData, setGeneralData] = useState({
    data: initialValues,
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
  const [isNextDisabled, setIsNextDisabled] = useState(false)
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

  const setFormValidation = useCallback(
    (isValid) => {
      setIsFormValid(isValid)
      setIsNextDisabled(!isValid || !isOverEighteen)
    },
    [isOverEighteen]
  )

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
        setGeneralData,
        isFormValid
      }}
    >
      {children}
    </StepContext.Provider>
  )
}

const useStepContext = () => useContext(StepContext)

export { StepProvider, useStepContext }
