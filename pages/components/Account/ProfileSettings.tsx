import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import {
  CreateAssetDocument,
  CreateAssetMutation,
  CreateAssetMutationVariables,
  GetMeDocument,
  GetMeQuery,
  GetMeQueryVariables,
  UpdateUserProfileInfoDocument,
  UpdateUserProfileInfoMutation,
  UpdateUserProfileInfoMutationVariables,
} from '../../../gql';
import { skipper } from '../../../lib/accessToken';
import TextField from '../atomic/textField';
import Toaster from '../atomic/toast/Toaster';
import { Intent, Position } from '../../../lib/common';
import Button from '../atomic/button';

const AppToaster = Toaster.create({ position: Position.TOP });

export default function ProfileSettings() {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
  });
  let fileInput;

  const { data, loading } = useQuery<GetMeQuery, GetMeQueryVariables>(
    GetMeDocument,
    { skip: skipper() },
  );

  const [UpdateProfile, { ...updateProfileData }] = useMutation<
    UpdateUserProfileInfoMutation,
    UpdateUserProfileInfoMutationVariables
  >(UpdateUserProfileInfoDocument);

  const [UploadFile, { ...uploadFileData }] = useMutation<
    CreateAssetMutation,
    CreateAssetMutationVariables
  >(CreateAssetDocument);

  useEffect(() => {
    if (data) {
      setProfile({
        firstName: data.me.firstName,
        middleName: data.me.middleName,
        lastName: data.me.lastName,
        email: data.me.email,
      });
    }
  }, [data]);

  return (
    <div>
      <div className="shadow sm:rounded-md sm:overflow-hidden">
        <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
          <div>
            <div className="ml-4">
              <label className="block text-sm font-medium text-gray-700">
                Profile Image
              </label>
              <div className="mt-1 flex items-center">
                <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                  <svg
                    className="h-full w-full text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
                <input
                  type="file"
                  accept="image/*"
                  ref={(ref) => (fileInput = ref)}
                  className="hidden"
                  onChange={(event) => {
                    if (event.target.files && event.target.files.length > 0) {
                      const file = event.target.files[0];
                      UploadFile({ variables: { file } })
                        .then((value) => {
                          console.log(value);
                        })
                        .catch((error) => {
                          AppToaster.show({
                            message: error.message,
                            intent: Intent.ERROR,
                          });
                        });
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => fileInput.click()}
                  className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Change
                </button>
              </div>
            </div>
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="grid grid-cols-6 gap-4">
                <div className="col-span-6 sm:col-span-3">
                  <TextField
                    floating={true}
                    value={profile.firstName}
                    onChange={(event) =>
                      setProfile({ ...profile, firstName: event.target.value })
                    }
                    placeholder="First Name"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <TextField
                    value={profile.middleName}
                    onChange={(event) =>
                      setProfile({ ...profile, middleName: event.target.value })
                    }
                    floating={true}
                    placeholder="Middle Name"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <TextField
                    floating={true}
                    value={profile.lastName}
                    onChange={(event) =>
                      setProfile({ ...profile, lastName: event.target.value })
                    }
                    placeholder="Last Name"
                  />
                </div>

                <div className="col-span-6 sm:col-span-4">
                  <TextField
                    floating={true}
                    value={profile.email}
                    onChange={(event) =>
                      setProfile({ ...profile, email: event.target.value })
                    }
                    placeholder="Email"
                    disabled={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <Button
            loading={updateProfileData.loading}
            onClick={() => {
              if (profile.firstName === '') {
                AppToaster.show({
                  message: 'First Name is required',
                  intent: Intent.ERROR,
                });
              }
              UpdateProfile({
                variables: {
                  firstName: profile.firstName,
                  middleName: profile.middleName,
                  lastName: profile.lastName,
                },
              })
                .then((value) => {
                  AppToaster.show({
                    message: 'Profile Updated',
                    intent: Intent.SUCCESS,
                  });
                })
                .catch((error) => {
                  AppToaster.show({
                    message: error.message,
                    intent: Intent.ERROR,
                  });
                });
            }}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
