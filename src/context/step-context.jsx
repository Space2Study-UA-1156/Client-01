import { createContext, useCallback, useContext, useState } from 'react'

const StepContext = createContext()

const StepProvider = ({ children, initialValues, stepLabels }) => {
  const [generalData, setGeneralData] = useState({
    data: initialValues,
    errors: {}
  })
  const [subject, setSubject] = useState([])
  const [language, setLanguage] = useState(null)
  const [photo, setPhoto] = useState([])
  const [generalLabel, subjectLabel, languageLabel, photoLabel] = stepLabels
  const [isNextDisabled, setIsNextDisabled] = useState(true)
  const [isOverEighteen, setIsOverEighteen] = useState(false)
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
          setLanguage(newData)
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

  return (
    <StepContext.Provider
      value={{
        stepData,
        handleStepData,
        isNextDisabled,
        toggleNextButton,
        isOverEighteen,
        handleOverEighteenChange
      }}
    >
      {children}
    </StepContext.Provider>
  )
}

const useStepContext = () => useContext(StepContext)

export { StepProvider, useStepContext }
