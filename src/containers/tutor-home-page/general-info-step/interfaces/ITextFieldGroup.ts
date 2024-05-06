export interface User {
  firstName: string
  lastName: string
}

export interface TextFieldGroupProps {
  message: string
  messageLength: number
  onMessageChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
