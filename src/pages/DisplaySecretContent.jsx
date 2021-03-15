import { Button, Col, Container, Row } from 'react-bootstrap';

import ApiManager from '../api/ApiManager';
import HttpConstants from '../constants/HttpConstants';
import PassphraseComponent from '../components/PassphraseComponent';
import React from 'react';
import SecretContent from '../components/SecretContent';
import UrlConstants from '../constants/UrlConstants';
import download from 'downloadjs';
import { isEmpty } from 'loadsh';
import { toast } from 'react-toastify';

class DisplaySecretContentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: props.match.params.token,
      passPhrase: '',
      secretContent: '',
      secretFileMimeType: '',
      secretFilePath: '',

      loading: false,
      tokenError: false,
      secretError: false,
      isPassphraseAvailable: true,
    };
  }

  componentDidMount() {
    ApiManager.makeApiCall(
      UrlConstants.VALIDATE_TOKEN.replace(':token', this.state.token),
      HttpConstants.GET_METHOD
    )
      .then((response) => {
        this.setState({
          loading: false,
          tokenError: false,
          isPassphraseAvailable: response.data.data.isPassphraseAvailable,
        });
      })
      .catch((error) => {
        this.setState({ loading: false, tokenError: true });
      });
  }

  handleSubmit = () => {
    const { token, passPhrase } = this.state;
    const data = {
      passPhrase,
    };
    this.setState({ loading: true });
    ApiManager.makeApiCall(
      UrlConstants.VALIDATE_PASSPHARSE.replace(':token', token),
      HttpConstants.POST_METHOD,
      data
    )
      .then((response) => {
        toast.success('Validation successfully', {
          backgroundColor: 'green',
        });
        this.getSecret();
      })
      .catch((error) => {
        toast.error('Invalid Passphrase', {
          backgroundColor: 'red',
        });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  getSecret = () => {
    const { token } = this.state;
    this.setState({ loading: true });
    ApiManager.makeApiCall(
      UrlConstants.GET_SECRET_CONTENT.replace(':token', token),
      HttpConstants.GET_METHOD
    )
      .then((response) => {
        this.setState({
          secretContent: response.data.data.secret.content,
          secretFileMimeType: response.data.data.secret.fileMimeType,
          secretFilePath: response.data.data.secret.filePath,
          secretError: false,
        });
      })
      .catch((error) => {
        this.setState({
          secretError: true,
        });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  // burnSecret = () => {
  //   const { token } = this.state;
  //   this.setState({ loading: true });

  //   ApiManager.makeApiCall(
  //     UrlConstants.BURN_SECRET.replace(':token', token),
  //     HttpConstants.DELETE_METHOD
  //   )
  //     .then((response) => {
  //       this.setState({ loading: false });
  //       toast.success('Secret Burned Successfully', {
  //         backgroundColor: 'green',
  //       });
  //       window.location.href =
  //         StringConstants.LOCALHOST + RouteConstants.CONTENT_PAGE;
  //     })
  //     .catch((error) => {
  //       this.setState({ loading: false });
  //       toast.error('Secret Burning Failed', {
  //         backgroundColor: 'red',
  //       });
  //     });
  // };

  downloadFile = (e) => {
    e.preventDefault();
    try {
      const { secretFileMimeType, secretFilePath, token } = this.state;
      this.setState({ loading: true });

      ApiManager.makeApiCall(
        UrlConstants.DOWNLOAD_FILE.replace(':token', token),
        HttpConstants.GET_METHOD,
        { responseType: 'blob' }
      )
        .then((response) => {
          if (response.status === 200) {
            this.setState({ loading: false });
            const split = secretFilePath.split('_');
            const filename = split[split.length - 1];
            return download(response.data, filename, secretFileMimeType);
          } else {
            this.setState({ loading: false });
            toast.error('Cannot Download Attachment', {
              backgroundColor: 'red',
            });
          }
        })
        .catch((error) => {
          this.setState({ loading: false });
          toast.error('Cannot Download Attachment', {
            backgroundColor: 'red',
          });
        });
    } catch (error) {}
  };

  handlePassphraseChange = (passPhrase) => {
    this.setState({ passPhrase });
  };

  render() {
    const {
      passPhrase,
      tokenError,
      loading,
      secretContent,
      secretFileMimeType,
      isPassphraseAvailable,
    } = this.state;
    return (
      <Container
        style={{ width: '80%', marginLeft: '300px', marginTop: '150px' }}
      >
        {!loading &&
          (!tokenError &&
          isEmpty(secretContent) &&
          isEmpty(secretFileMimeType) &&
          isPassphraseAvailable ? (
            <PassphraseComponent
              handleSubmit={this.handleSubmit}
              passPhrase={passPhrase}
              handlePassphraseChange={this.handlePassphraseChange}
            />
          ) : !isEmpty(secretContent) || !isEmpty(secretFileMimeType) ? (
            <SecretContent
              secretContent={secretContent}
              secretFileMimeType={secretFileMimeType}
              handleFileDownload={this.downloadFile}
            />
          ) : !isPassphraseAvailable ? (
            <Row>
              <Col md={6}>
                <Button
                  className='float-left'
                  style={{ marginTop: '10px' }}
                  variant='primary'
                  onClick={this.getSecret}
                >
                  Show Secret
                </Button>
              </Col>
            </Row>
          ) : (
            <Row>
              <Col md={6}>
                <h2>Secret Expired</h2>
              </Col>
            </Row>
          ))}
      </Container>
    );
  }
}

export default DisplaySecretContentPage;
