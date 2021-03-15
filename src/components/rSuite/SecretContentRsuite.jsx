import {
  Button,
  ButtonToolbar,
  Form,
  FormControl,
  FormGroup,
  Panel,
} from 'rsuite';

import HelperUtils from '../../utils/HelperUtils';
import React from 'react';
import RouteConstants from '../../constants/RouteConstants';
import { isEmpty } from 'loadsh';

const SecretContentRsuite = (props) => {
  const { secretContent, secretFileMimeType, handleFileDownload } = props;

  return (
    <>
      <Panel header={<h3>Secret is...</h3>} shaded>
        <Form>
          <FormGroup>
            <FormControl
              name='secret'
              componentClass='textarea'
              placeholder='Your secret...'
              rows={5}
              readOnly
              value={secretContent}
            />
          </FormGroup>
          {!isEmpty(secretFileMimeType) && (
            <FormGroup>
              <ButtonToolbar>
                <a href='/' onClick={(e) => handleFileDownload(e)}>
                  Download File
                </a>
              </ButtonToolbar>
            </FormGroup>
          )}
          <FormGroup>
            <ButtonToolbar>
              <Button
                color='red'
                appearance='ghost'
                onClick={() => {
                  window.location.href = HelperUtils.generateUrlForFrontend(
                    RouteConstants.RSUITE_CONTENT_PAGE
                  );
                }}
              >
                Close
              </Button>
            </ButtonToolbar>
          </FormGroup>
        </Form>
      </Panel>
    </>
  );
};

export default SecretContentRsuite;
