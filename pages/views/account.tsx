import DefaultLayout from '../layouts/defaultLayout';
import React, { useState } from 'react';
import ProfileSettings from '../components/Account/ProfileSettings';
import clsx from 'clsx';

const tabList = [
  {
    title: 'Profile Settings',
  },
  {
    title: 'Account Settings',
  },
];

function Account() {
  const [tabs, setTabs] = useState(0);

  return (
    <div className="bg-body-light h-full">
      <div className="container mx-auto pt-10 pb-10">
        <span className="text-4xl text-blueGray-800">Settings</span>
        <div className="grid grid-cols-4 gap-4 mt-5">
          <div className="">
            {tabList.map((item, index) => (
              <div
                className={clsx({
                  'shadow-lg rounded rounded-md bg-white transition ease-in-out':
                    tabs === index,
                  'p-5 mt-1 mb-1 ': true,
                  'hover:shadow-sm hover:bg-warmGray-100 transition ease-in-out':
                    tabs !== index,
                })}
                onClick={() => setTabs(index)}
              >
                <span className="text-blueGray-500 text-lg">{item.title}</span>
              </div>
            ))}
          </div>
          <div className="col-span-3">{tabs === 0 && <ProfileSettings />}</div>
        </div>
      </div>
    </div>
  );
}

Account.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default Account;
