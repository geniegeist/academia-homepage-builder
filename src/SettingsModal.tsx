import React, { Button, Modal } from 'react-bootstrap';

type Props = {
  show: boolean;
  onHide: () => void;
  onReset: () => void;
};

function SettingsModal({ show, onHide, onReset }: Props) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Settings
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Version: beta 0.0.1
        </p>
        <p>
          Source code available on <a href="https://github.com/geniegeist/resumeedit" rel="noreferrer" target="_blank">Github</a>.
        </p>
        <hr />
        <b>Reset application</b>
        <p>
          This will clean all your files locally.
        </p>
        <Button onClick={onReset} variant="danger">Reset</Button>
      </Modal.Body>
    </Modal>
  );
}

export default SettingsModal;
