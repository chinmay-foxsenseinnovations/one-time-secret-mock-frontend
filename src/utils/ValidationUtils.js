import { isEmpty } from 'lodash';

const validateContent = (content) => {
  if (isEmpty(content)) return false;
  else return true;
};

export default validateContent;
