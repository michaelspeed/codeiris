import { Intent, Position } from 'lib/common';
import Toaster from 'pages/components/atomic/toast/Toaster';
import DefaultLayout from 'pages/layouts/defaultLayout';
import React, { useState } from 'react';
import {
  AddPostDocument,
  AddPostMutation,
  AddPostMutationVariables,
  PostType,
} from 'gql';
import { useMutation } from '@apollo/client';
import FormSaveLinkPost from './savePost/FormSaveLinkPost';
import FormSaveJobPost from './savePost/FormSaveJobPost';
import FormSaveAskPost from './savePost/FormSaveAskPost';
import clsx from 'clsx';

const AppToaster = Toaster.create({ position: Position.BOTTOM });

const initialFields = {
  imageURL: '',
  title: '',
  url: '',
  body: '',
};

function PostTabBox({ children, onClick, active = false }) {
  return (
    <div
      className={clsx(
        'py-2 px-4 rounded-md mb-3 cursor-pointer transition-all capitalize',
        active
          ? 'bg-primary-light text-white'
          : 'bg-white hover:bg-secondary-dark',
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

function SavePost() {
  const [activeTab, setActiveTab] = useState(PostType.Link);

  const [AddPost, { ...addPostData }] = useMutation<
    AddPostMutation,
    AddPostMutationVariables
  >(AddPostDocument);

  const handleOnSave = (data, onSuccess = () => {}) => {
    // + inserting row
    AddPost({
      variables: {
        ...initialFields,
        ...data,
      },
    })
      .then((value) => {
        AppToaster.show({
          message: 'Post Published Successfully!',
          intent: Intent.SUCCESS,
        });

        onSuccess();
      })
      .catch((error) => handleOnError(error.message));
  };

  const handleOnError = (message) => {
    AppToaster.show({
      message,
      intent: Intent.WARNING,
    });
  };

  // AppToaster.show({
  //   message: 'Test',
  //   intent: Intent.SUCCESS,
  //   timeout: 999999999,
  // });

  return (
    <div className="container px-40 mt-10">
      <div className="text-2xl mb-8">
        Create <span className="capitalize">{activeTab}</span> Post
      </div>

      <div className="flex">
        <div className="flex-grow p-3 bg-white mr-5 rounded-md">
          {getForm(activeTab, addPostData.loading, handleOnError, handleOnSave)}
        </div>

        <div style={{ minWidth: '200px' }}>
          {Object.values(PostType)
            .reverse()
            .map((pt, index) => (
              <PostTabBox
                key={index}
                active={pt === activeTab}
                onClick={() => setActiveTab(pt)}
              >
                {pt}
              </PostTabBox>
            ))}
        </div>
      </div>
    </div>
  );
}

function getForm(type, loading, handleOnError, handleOnSave) {
  switch (type) {
    case PostType.Link:
      return (
        <FormSaveLinkPost
          initialFields={initialFields}
          loading={loading}
          processError={handleOnError}
          processSave={handleOnSave}
        />
      );
    case PostType.Job:
      return (
        <FormSaveJobPost
          initialFields={initialFields}
          loading={loading}
          processError={handleOnError}
          processSave={handleOnSave}
        />
      );
    case PostType.Ask:
      return (
        <FormSaveAskPost
          initialFields={initialFields}
          loading={loading}
          processError={handleOnError}
          processSave={handleOnSave}
        />
      );
  }
}

SavePost.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default SavePost;
