import { Button } from '@mantine/core';
import { Link } from 'react-router-dom';

function TableDetailButton({ url, text = 'Güncelle',deletedOnChange }) {
  return (
  <>
      <Link to={url}>
          <Button mr={"sm"} color={'blue'}>
              {text}
          </Button>
      </Link>
      <Button color="red" onClick={deletedOnChange}>
          sil
      </Button>
  </>
  );
}

export default TableDetailButton;
