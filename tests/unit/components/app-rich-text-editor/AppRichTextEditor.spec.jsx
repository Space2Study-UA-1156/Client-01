import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'

import AppRichTextEditor from '~/components/app-rich-text-editor/AppRichTextEditor'

vi.mock('@tinymce/tinymce-react', async (importOriginal) => {
  const module = await importOriginal()

  return {
    ...module,
    Editor: () => <input data-testid='tinymce-editor' />
  }
})

describe('App RichText Editor', () => {
  it('renders correctly', () => {
    render(<AppRichTextEditor />)

    expect(screen.getByTestId('tinymce-editor')).toBeInTheDocument()
  })
})
