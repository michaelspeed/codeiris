import Heading, { HeadingSize } from '../atomic/typography';
import Router from 'next/router';
import { useQuery } from '@apollo/client';
import { GetMeDocument, GetMeQuery, GetMeQueryVariables } from '../../../gql';
import { getAccessToken, logout, skipper } from '../../../lib/accessToken';
import Spinner from '../atomic/spinner';
import { SpinnerSize } from '../../../lib/common/props/SpinnerProps';
import Avatar from '../atomic/avatar/Avatar';
import Dropdown from '../atomic/dropdown/Dropdown';
import TextField from '../atomic/textField';
import { useState } from 'react';

function Filter() {
  const [tag, setTag] = useState('');

  return (
    <div className="flex flex-row container mx-auto">
      <TextField
        value={tag}
        onChange={(event) => setTag(event.target.value)}
        placeholder="Tags"
      />
    </div>
  );
}

export default Filter;
