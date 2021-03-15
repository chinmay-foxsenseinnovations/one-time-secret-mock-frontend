import { Button, Col, Container, Form, Row } from 'react-bootstrap';

import ApiManager from '../api/ApiManager';
import HelperUtils from '../utils/HelperUtils';
import HttpConstants from '../constants/HttpConstants';
import React from 'react';
import RouteConstants from '../constants/RouteConstants';
import TokenDisplaySection from '../components/common/TokenDisplaySection';
import UrlConstants from '../constants/UrlConstants';
import ValidationUtils from '../utils/ValidationUtils';
import { isEmpty } from 'loadsh';
import { toast } from 'react-toastify';

class ContentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      passPhrase: '',
      validTill: 1,
      token: '',
      isFileUploaded: false,
      generatePassphrase: false,
      autoGeneratedPassphrase: '',

      loading: false,
      contentError: false,
    };
  }

  handleSubmit = () => {
    try {
      const { content, passPhrase, validTill, generatePassphrase } = this.state;
      this.setState({ loading: true });
      const formData = new FormData();
      formData.set('content', content);
      formData.set('passPhrase', passPhrase);
      formData.set('TTL', validTill);
      formData.set('generatePassphrase', generatePassphrase);
      formData.append('file', this.fileUpload.files[0]);
      ApiManager.makeApiCall(
        UrlConstants.CREATE_SECRET_CONTENT,
        HttpConstants.POST_METHOD,
        formData
      )
        .then((response) => {
          this.setState({
            loading: false,
            token: response.data.data.token,
            autoGeneratedPassphrase: response.data.data.passPhrase
              ? response.data.data.passPhrase
              : '',
          });
          toast.success('Secret content created successfully', {
            backgroundColor: 'green',
          });
        })
        .catch((err) => {
          toast.error('Secret content created successfully', {
            backgroundColor: 'red',
          });
        });
    } catch (error) {
      console.log('err - ', error);
    }
  };

  validateStates = () => {
    const { content, isFileUploaded } = this.state;
    return !(ValidationUtils.validateContent(content) || isFileUploaded);
  };

  render() {
    const {
      validTill,
      token,
      generatePassphrase,
      autoGeneratedPassphrase,
    } = this.state;
    return (
      <Container
        style={{ width: '80%', marginLeft: '300px', marginTop: '150px' }}
      >
        {!isEmpty(token) && (
          <div className='col-md-6'>
            <TokenDisplaySection
              token={token}
              passPhrase={autoGeneratedPassphrase}
            />
          </div>
        )}
        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label className='float-left'>Secret Content</Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                placeholder='Enter your secret content'
                onChange={(e) =>
                  this.setState({
                    content: e.target.value,
                  })
                }
                onBlur={() =>
                  this.setState({
                    contentError: !ValidationUtils.validateContent(
                      this.state.content
                    ),
                  })
                }
                // style={{ borderColor: contentError ? 'red' : '' }}
                // isInvalid={!!contentError}
                disabled={!isEmpty(token)}
              />
              {/* <Collapse in={contentError}>
                <Form.Control.Feedback type='invalid'>
                  Please enter content
                </Form.Control.Feedback>
              </Collapse> */}
            </Form.Group>
          </Col>
        </Row>
        <Row style={{ marginBottom: '20px' }}>
          <Col md={6}>
            <Form.File
              id='formcheck-api-regular'
              formEncType='multipart/form-data'
            >
              <Form.File.Label className='float-left'>
                Upload File
              </Form.File.Label>
              <Form.File.Input
                disabled={!isEmpty(token)}
                ref={(ref) => (this.fileUpload = ref)}
                onChange={() => {
                  this.setState({
                    isFileUploaded: !this.state.isFileUploaded,
                  });
                }}
              />
            </Form.File>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label className='float-left'>Pass Phrase</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Pass Phrase'
                onChange={(e) => this.setState({ passPhrase: e.target.value })}
                disabled={!isEmpty(token) || generatePassphrase}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className='float-left'>
              <Form.Check
                type='checkbox'
                label='Generate Passphrase'
                value={generatePassphrase}
                onChange={(e) =>
                  this.setState({ generatePassphrase: e.target.checked })
                }
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label className='float-left'>
                Valid Till (minutes)
              </Form.Label>
              <Form.Control
                type='number'
                placeholder='Number of minutes'
                onChange={(e) =>
                  this.setState({
                    validTill:
                      e.target.value <= 0 || e.target.value === ''
                        ? 1
                        : e.target.value,
                  })
                }
                value={validTill}
                disabled={!isEmpty(token)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            {isEmpty(token) ? (
              <Button
                className='float-left'
                style={{ marginTop: '10px' }}
                variant='primary'
                onClick={this.handleSubmit}
                disabled={this.validateStates()}
              >
                Create Secret Link
              </Button>
            ) : (
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
                Create New Secret
              </Button>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ContentPage;