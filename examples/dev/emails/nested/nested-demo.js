import React from 'react';

import {
  Mjml,
  MjmlHead,
  MjmlTitle,
  MjmlBody,
  MjmlSection,
  MjmlColumn,
  MjmlText,
  MjmlRaw,
} from 'mjml-react';

function NestedDemo() {
  return (
    <Mjml>
      <MjmlHead>
        <MjmlTitle>Nested Demo</MjmlTitle>
      </MjmlHead>
      <MjmlBody width={500}>
        <MjmlSection fullWidth backgroundColor="#efefef">
          <MjmlColumn>
            <MjmlText align="center">Nested Demo</MjmlText>
          </MjmlColumn>
        </MjmlSection>
      </MjmlBody>
    </Mjml>
  );
}

export default NestedDemo;