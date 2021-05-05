import DefaultLayout from '../layouts/defaultLayout';
import React from 'react';
import { useQuery } from '@apollo/client';
import {
  GetMeCommentsCountDocument,
  GetMeCommentsCountQuery,
  GetMeCommentsCountQueryVariables,
  GetMeDocument,
  GetMePostsCountDocument,
  GetMePostsCountQuery,
  GetMePostsCountQueryVariables,
  GetMeQuery,
  GetMeQueryVariables,
} from '../../gql';
import { skipper } from '../../lib/accessToken';
import Spinner from '../components/atomic/spinner';
import { SpinnerSize } from '../../lib/common/props/SpinnerProps';

function Profile() {
  const { data, loading } = useQuery<GetMeQuery, GetMeQueryVariables>(
    GetMeDocument,
    { skip: skipper() },
  );

  const { ...commentCount } = useQuery<
    GetMeCommentsCountQuery,
    GetMeCommentsCountQueryVariables
  >(GetMeCommentsCountDocument, { skip: skipper() });

  const { ...postCount } = useQuery<
    GetMePostsCountQuery,
    GetMePostsCountQueryVariables
  >(GetMePostsCountDocument, { skip: skipper() });

  return (
    <div>
      {loading && (
        <div className="h-full flex justify-center items-center mt-10">
          <Spinner size={SpinnerSize.large} />
        </div>
      )}
      {data && (
        <main className="profile-page">
          <section className="relative block" style={{ height: 500 }}>
            <div
              className="absolute top-0 w-full h-full bg-center bg-cover"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80")',
              }}
            >
              <span
                id="blackOverlay"
                className="w-full h-full absolute opacity-50 bg-black"
              ></span>
            </div>
            <div
              className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
              style={{ height: 70 }}
            >
              <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="text-gray-300 fill-current"
                  points="2560 0 2560 100 0 100"
                ></polygon>
              </svg>
            </div>
          </section>
          <section className="relative py-16 bg-gray-300">
            <div className="container mx-auto px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                <div className="px-6">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                      <div className="relative">
                        <img
                          alt="..."
                          src="https://images.unsplash.com/photo-1599110906447-f38264a9c345?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80"
                          className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                          style={{ maxWidth: 150 }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-12">
                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-800 mb-2">
                      {data.me.firstName} {data.me.middleName}{' '}
                      {data.me.lastName}
                    </h3>
                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                      <div className="flex justify-center py-4 lg:pt-4 pt-8">
                        {postCount.data && (
                          <div className="mr-4 p-3 text-center">
                            <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                              {postCount.data.getMePosts.totalCount}
                            </span>
                            <span className="text-sm text-gray-500">Post</span>
                          </div>
                        )}
                        {commentCount.data && (
                          <div className="lg:mr-4 p-3 text-center">
                            <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                              {commentCount.data.getMeComments.totalCount}
                            </span>
                            <span className="text-sm text-gray-500">
                              Comments
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                      <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>
                      Placeholder Text
                    </div>
                    <div className="mb-2 text-gray-700 mt-10">
                      <i className="fas fa-briefcase mr-2 text-lg text-gray-500"></i>
                      Placeholder Text
                    </div>
                    <div className="mb-2 text-gray-700">
                      <i className="fas fa-university mr-2 text-lg text-gray-500"></i>
                      Placeholder Text
                    </div>
                  </div>
                  <div className="mt-10 py-10 border-t border-gray-300 text-center">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-9/12 px-4"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}
    </div>
  );
}

Profile.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default Profile;
