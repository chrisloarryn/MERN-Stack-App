import React from 'react';

import Modal from './Modal';
import Button from '../FormElements/Button';

interface IProps {
  onClear: Function;
  error: any;
}

const ErrorModal = (props: IProps) => {
  return (
    <Modal
      onCancel={props.onClear}
      header="An Error Occurred!"
      show={!!props.error}
      footer={<Button onClick={props.onClear}>Okay</Button>}
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
