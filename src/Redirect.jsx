import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router';
import axios from 'axios';

function Redirect() {
  const { hash } = useParams();
  const history = useHistory();
  const [err, setErr] = useState(false);

  useEffect(async () => {
    try {
      const response = await axios(
        `https://miu.services/backend/api/short/${hash}`,
        {
          headers: { 'content-type': 'application/json' },
          method: 'GET',
        },
      );
      if (response.status === 200) {
        const originalURL = response.data.url;
        window.location.href = originalURL;
      }
    } catch (error) {
      if (error.response) {
        setErr(true);
        history.push('/404');
      }
    }
  }, []);

  return (
    <>
      {!err ? (
        <div className='flex flex-col text-center justify-center items-cemter pt-12'>
          <h1 className='my-10 ml-10 text-white text-4xl'>Redirecting...</h1>
          <img className='w-60 mx-auto' src='/src/powered-by-vitawind-dark.png' alt='redirecting' />
        </div>
      ) : (
        <div className='flex flex-col text-center justify-center items-cemter pt-12'>
          <h1 className='my-10 mx-auto text-white text-4xl'>404</h1>
          <button className='mx-auto p-3 my-10 border-white border-2 rounded-xl text-white text-xl' type='button' onClick={() => history.push('/')}>Back to Home</button>
        </div>
      )}
    </>
  );
}

export default Redirect;
