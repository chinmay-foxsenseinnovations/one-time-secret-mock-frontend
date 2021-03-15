import { Button, Col, Form, Row } from 'react-bootstrap';

import React from 'react';
import { isEmpty } from 'lodash';

const PassphraseComponent = (props) => {
  const { handlePassphraseChange, handleSubmit, passPhrase } = props;
  return (
    <>
      <Row>
        <Col md={6}>
          <Form.Group>
            <Form.Label className='float-left'>Enter Pass Pharse</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter pass phrase'
              onChange={(e) => handlePassphraseChange(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Button
            className='float-left'
            style={{ marginTop: '10px' }}
            variant='primary'
            onClick={handleSubmit}
            disabled={isEmpty(passPhrase)}
          >
            Submit
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default PassphraseComponent;
