import {
  Button,
  ButtonToolbar,
  Form,
  FormControl,
  FormGroup,
  Panel,
} from 'rsuite';

import React from 'react';
import { isEmpty } from 'lodash';

const PassphraseComponentRsuite = (props) => {
  const { handlePassphraseChange, handleSubmit, passPhrase } = props;
  return (
    <>
      <Panel header={<h3>Enter your Passphrase</h3>} shaded>
        <Form>
          <FormGroup>
            <FormControl
              name='passphrase'
              type='password'
              placeholder='Passphrase'
              onChange={(e) => {
                handlePassphraseChange(e);
              }}
            />
          </FormGroup>
          <FormGroup>
            <ButtonToolbar>
              <Button
                appearance='primary'
                onClick={handleSubmit}
                disabled={isEmpty(passPhrase)}
              >
                Submit
              </Button>
            </ButtonToolbar>
          </FormGroup>
        </Form>
      </Panel>
    </>
  );
};

export default PassphraseComponentRsuite;
