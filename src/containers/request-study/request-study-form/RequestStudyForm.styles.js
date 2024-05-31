export const styles = {
  label: {
    typography: 'body2',
    color: 'primary.500',
    mb: '4px'
  },
  textArea: {
    width: '100%'
  },
  button: {
    mt: '20px',
    width: { xs: '100%', sm: 'auto' }
  },
  placeholder: {
    textarea: {
      '&::placeholder': {
        color: 'primary.300',
        opacity: 1
      }
    },
    input: {
      '&::placeholder': {
        color: 'primary.300',
        opacity: 1
      }
    }
  }
}
