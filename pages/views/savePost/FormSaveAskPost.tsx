import { PostType } from 'gql';
import Button from 'pages/components/atomic/button';
import TextArea from 'pages/components/atomic/textArea';
import TextField from 'pages/components/atomic/textField';
import useForm from 'pages/hooks/useForm';
import React from 'react';

function FormSaveAskPost({
  initialFields,
  loading = false,
  processError,
  processSave,
}) {
  const {
    props: { title, body },
    dispatch,
    handleFieldChange,
  } = useForm(initialFields);

  const handleSubmit = () => {
    let error;

    if (title === '') error = 'You must enter a title!';
    else if (body === '') error = 'You must enter the body!';

    if (error) {
      processError(error);
      return;
    }

    processSave({ title, body, type: PostType.Ask }, reset);
  };

  const reset = () => dispatch(initialFields);

  return (
    <>
      <TextField
        value={title}
        placeholder="Question"
        onChange={(e) => handleFieldChange('title', e)}
      />

      <TextArea
        value={body}
        placeholder="Body"
        onChange={(e) => handleFieldChange('body', e)}
        className="w-full"
      />

      <Button loading={loading} onClick={handleSubmit}>
        Add
      </Button>
    </>
  );
}

export default FormSaveAskPost;
