import { Button, Col, Form, Row } from 'react-bootstrap';

import HelperUtils from '../utils/HelperUtils';
import React from 'react';
import RouteConstants from '../constants/RouteConstants';
import { isEmpty } from 'loadsh';

const SecretContent = (props) => {
  const { secretContent, secretFileMimeType, handleFileDownload } = props;
  return (
    <>
      <Row>
        <Col md={6}>
          <Form.Group>
            <Form.Label className='float-left'>Your Secret</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              placeholder='No secret string to display'
              disabled
              value={secretContent}
            />
          </Form.Group>
        </Col>
      </Row>
      {!isEmpty(secretFileMimeType) && (
        <Row>
          <Col md={6}>
            <a href='/' onClick={(e) => handleFileDownload(e)}>
              Download
            </a>
          </Col>
        </Row>
      )}
      <Row>
        <Col md={6}>
          <Button
            className='float-left'
            style={{ marginTop: '10px' }}
            variant='primary'
            onClick={() => {
              window.location.href = HelperUtils.generateUrlForFrontend(
                RouteConstants.CONTENT_PAGE
              );
            }}
          >
            Close
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default SecretContent;
