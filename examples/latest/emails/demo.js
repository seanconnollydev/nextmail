import React from 'react';
import axios from 'axios';
import {
  Mjml,
  MjmlHead,
  MjmlTitle,
  MjmlBody,
  MjmlSection,
  MjmlColumn,
  MjmlText,
} from 'nextmail/mjml-react';
import Header from './src/components/Header';

function Demo(props) {
  const { user } = props;

  return (
    <Mjml>
      <MjmlHead>
        <MjmlTitle>Las Minute Offer</MjmlTitle>
      </MjmlHead>
      <MjmlBody width={500}>
        <MjmlSection fullWidth backgroundColor="#efefef">
          <MjmlColumn>
            <Header />
            <MjmlText align="center">
              {`Hello ${user.name}`}
            </MjmlText>
          </MjmlColumn>
        </MjmlSection>
      </MjmlBody>
    </Mjml>
  );
}

Demo.getInitialProps = async ({ payload }) => {
  const { userId } = payload;
  const resp = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId || 1}`);
  return { user: resp.data };
};

Demo.getSubject = async ({ payload, props }) => {
  const { userId } = payload;
  const { user } = props;

  return `${user.name}(${userId}), read this email!`;
};

export default Demo;
