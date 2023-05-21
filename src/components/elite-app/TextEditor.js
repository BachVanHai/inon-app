import {
    ContentState,
    convertToRaw,
    EditorState
  } from 'draft-js'
  import draftToHtml from 'draftjs-to-html'
  import htmlToDraft from 'html-to-draftjs'
  import React, { useEffect, useState } from 'react'
  import { Editor } from 'react-draft-wysiwyg'
  import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import styled from 'styled-components'
  const TextEditorStyled = styled.div`
  @media (max-width: 768px) {
    .rdw-editor-toolbar{
      display : none !important
    }
  }
  `
  const TextEditor = (props) => {
    const {
      className,
      handleChangeValue,
      defaultValueProps,
      minHeight ,
      maxHeight,
      name,
      formik,
      handlSetValue,
      errors,
      isEmpty,
      disabled
    } = props
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const onEditorStateChange = (editorState) => {
      setEditorState(editorState)
      var s = convertToRaw(editorState.getCurrentContent());
      if(s.blocks[0].text.trim().length <= 0){
        formik(name , '')
      }else{
        formik(
          name,
          draftToHtml(convertToRaw(editorState.getCurrentContent()))
        )
      }
    }
    function toHtml(es) {
      return draftToHtml(convertToRaw(es.getCurrentContent()))
    }
    useEffect(() => {
      if (toHtml(editorState) === defaultValueProps) return
      setEditorState(
        EditorState.push(
          editorState,
          ContentState.createFromBlockArray(
            htmlToDraft(defaultValueProps || ''),
          ),
        ),
      )
      if (isEmpty) {
        setEditorState(EditorState.createEmpty())
      }
    }, [defaultValueProps , isEmpty])
    return (
      <TextEditorStyled>
        {defaultValueProps == undefined ? (
          <Editor
            editorState={editorState}
            wrapperClassName='wrapper-class'
            editorClassName='editor-class'
            toolbarClassName='toolbar-class'
            className={className}
            onEditorStateChange={onEditorStateChange}
            onChange={handlSetValue}
            editorStyle={{
              border: `${errors[name] ?  '1px solid #ea5455' : '1px solid #d9d9d9'}`,
              borderRadius : "5px",
              padding : '10px',
              minHeight : minHeight ,
              maxHeight: maxHeight,
              backgroundColor : '#fff'
            }}
          />
        ) : (
          <Editor
            editorState={editorState}
            wrapperClassName='wrapper-class'
            editorClassName='editor-class'
            toolbarClassName='toolbar-class'
            onChange={handleChangeValue}
            className={className}
            onEditorStateChange={onEditorStateChange}
            readOnly={disabled}
            editorStyle={{
              border: `${errors[name] ?  '1px solid #ea5455' : '1px solid #d9d9d9'} `,
              borderRadius : "5px",
              padding : '10px',
              minHeight : minHeight ,
              maxHeight: maxHeight,
              backgroundColor : '#fff'
            }}
          />
        )}
      </TextEditorStyled>
    )
  }
  
  export default TextEditor
  