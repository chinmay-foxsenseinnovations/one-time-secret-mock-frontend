import { Alert, Collapse } from 'react-bootstrap';

import HelperUtils from '../../utils/HelperUtils';
import React from 'react';
import RouteConstants from '../../constants/RouteConstants';

class TokenDisplaySection extends React.Component {
  render() {
    const { token, passPhrase } = this.props;
    const url = HelperUtils.generateUrlForFrontend(
      RouteConstants.DISPLAY_SECRET_CONTENT.replace(':token', token)
    );
    return (
      <Collapse>
        <Alert variant='info'>
          <div>
            <p className='p2'>Your secret link</p>
            <span>{url}</span>
          </div>
          {passPhrase && (
            <>
              <hr />
              <p className='p2'>Pass Phrase</p>
              <span>{passPhrase}</span>
            </>
          )}
        </Alert>
      </Collapse>
    );
  }
}

export default TokenDisplaySection;
