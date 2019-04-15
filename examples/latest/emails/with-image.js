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

function WithImage(props) {
  return (
    <Mjml>
      <MjmlHead>
        <MjmlTitle>Las Minute Offer</MjmlTitle>
      </MjmlHead>
      <MjmlBody width={500}>
        <MjmlSection fullWidth backgroundColor="#efefef">
          <MjmlColumn>
            <MjmlImage src="/static/bicycle.jpeg" />
          </MjmlColumn>
        </MjmlSection>
      </MjmlBody>
    </Mjml>
  );
}

WithImage.getSubject = () => 'With Image';

export default WithImage;
