import { useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react'

const AppRichTextEditor = ({
  initialValue = '',
  onChange,
  height = 300,
  menuBar = true
}) => {
  const editorRef = useRef(null)

  return (
    <Editor
      apiKey={import.meta.env.VITE_TINY_MCE_API_KEY}
      init={{
        height: height,
        menubar: menuBar,
        toolbar: `undo redo | blocks fontfamily fontsize | bold italic underline strikethrough 
          | link image media table mergetags | addcomment showcomments 
          | spellcheckdialog a11ycheck typography | align lineheight 
          | checklist numlist bullist indent outdent | emoticons charmap | removeformat`,
        tinycomments_mode: 'embedded'
      }}
      initialValue={initialValue}
      onChange={() => onChange(editorRef.current.getContent())}
      onInit={(_evt, editor) => (editorRef.current = editor)}
    />
  )
}

export default AppRichTextEditor