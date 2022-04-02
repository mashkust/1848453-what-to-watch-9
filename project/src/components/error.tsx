import {useAppSelector} from '../hooks/hooks';

function Error(): JSX.Element | null {
  const {error} = useAppSelector(({DATA}) => DATA);

  if (error) {
    return (
      <div className='error-message'>
        {error}
      </div>
    );
  }

  return null;
}

export default Error;
