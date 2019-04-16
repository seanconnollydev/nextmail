import React from 'react';
import {
  Mjml,
  MjmlHead,
  MjmlTitle,
  MjmlBody,
  MjmlSection,
  MjmlColumn,
  MjmlImage,
} from 'nextmail/mjml-react';
import config from './src/config';

function WithImage() {
  return (
    <Mjml>
      <MjmlHead>
        <MjmlTitle>With Image</MjmlTitle>
      </MjmlHead>
      <MjmlBody width={500}>
        <MjmlSection fullWidth backgroundColor="#efefef">
          <MjmlColumn>
            <MjmlImage src={`${config.assetPrefix}/static/bicycle.jpeg`} />
          </MjmlColumn>
        </MjmlSection>
      </MjmlBody>
    </Mjml>
  );
}

WithImage.getSubject = () => 'With Image';

export default WithImage;
