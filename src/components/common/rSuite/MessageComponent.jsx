import { Icon, IconButton, Message, Tooltip, Whisper } from 'rsuite';
import React, { useState } from 'react';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import HelperUtils from '../../../utils/HelperUtils';
import RouteConstants from '../../../constants/RouteConstants';

const MessageComponent = (props) => {
  const { token, autoGeneratedPassphrase } = props;
  const url = HelperUtils.generateUrlForFrontend(
    RouteConstants.RSUITE_DISPLAY_SECRET_CONTENT.replace(':token', token)
  );

  const [urlCopied, setUrlCopied] = useState(false);
  const [passphraseCopied, setPassphraseCopied] = useState(false);

  const urlTooltip = <Tooltip>{urlCopied ? 'Copied' : 'Copy link'}</Tooltip>;
  const passphraseTooltip = (
    <Tooltip>{passphraseCopied ? 'Copied' : 'Copy Password'}</Tooltip>
  );

  return (
    <Message
      showIcon
      type='info'
      title='Your Secret Link is Ready.'
      description={
        <>
          <hr />
          <p>
            Secret Link:
            <br />
            <b>{url}</b>
            <CopyToClipboard text={url} onCopy={() => setUrlCopied(true)}>
              <Whisper placement='top' trigger='hover' speaker={urlTooltip}>
                <IconButton
                  style={{ marginLeft: '5px' }}
                  size='sm'
                  icon={<Icon icon='copy' />}
                  color='blue'
                  circle
                />
              </Whisper>
            </CopyToClipboard>
          </p>
          {autoGeneratedPassphrase && (
            <>
              <p>
                Auto Generated Password:
                <br />
                <b>{autoGeneratedPassphrase}</b>
                <CopyToClipboard
                  text={autoGeneratedPassphrase}
                  onCopy={() => setPassphraseCopied(true)}
                >
                  <Whisper
                    placement='top'
                    trigger='hover'
                    speaker={passphraseTooltip}
                  >
                    <IconButton
                      style={{ marginLeft: '5px' }}
                      size='sm'
                      icon={<Icon icon='copy' />}
                      color='blue'
                      circle
                    />
                  </Whisper>
                </CopyToClipboard>
              </p>
            </>
          )}
        </>
      }
    />
  );
};

export default MessageComponent;