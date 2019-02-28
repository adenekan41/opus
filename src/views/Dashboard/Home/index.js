import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Text, Heading, Flex, Box } from 'rebass';
import { HomeContainer, TableRowItem } from './style';
import Button from '../../../components/Button';
import { Icon } from '../../../components/Icon';
import Card from '../../../components/Card';
import Avatar from '../../../components/Avatar';

const Home = ({ users, alerts, contacts, advice_models, profile, history }) => {
  return (
    <HomeContainer>
      <div className="row">
        <Box className="col-md-12" mb="50px">
          <Flex alignItems="center">
            <Icon name="circle" color="#FF9901" />
            <Heading ml="8px">
              <span style={{ fontWeight: 'normal' }}>Welcome back,</span>{' '}
              {profile.first_name}
            </Heading>
          </Flex>
          <Text color="#b4b4b4" mt="4px" fontSize="14px">
            You have sent out {alerts.length} alerts this week.
          </Text>
        </Box>
      </div>
      <div className="row">
        <div className="col-md-3">
          <Card padding="30px 20px" mb="15px">
            <Flex flexDirection="column" alignItems="center">
              <div className="card-icon__wrapper">
                <Icon name="team" color="#29cb98" />
              </div>
              <Text mt="8px" color="#b0b0b0">
                Total Users
              </Text>
              <Heading my="30px" fontWeight="normal" fontSize="32px">
                {users.length}
              </Heading>
              <Button
                kind="green"
                block
                onClick={() => history.push('/dashboard/team')}
              >
                View team members
              </Button>
            </Flex>
          </Card>
        </div>
        <div className="col-md-3">
          <Card padding="30px 20px" mb="15px">
            <Flex flexDirection="column" alignItems="center">
              <div className="card-icon__wrapper">
                <Icon name="send" color="#29cb98" />
              </div>
              <Text mt="8px" color="#b0b0b0">
                Total Messages sent today
              </Text>
              <Heading my="30px" fontWeight="normal" fontSize="32px">
                {alerts.length}
              </Heading>
              <Button
                kind="green"
                block
                onClick={() => history.push('/dashboard/alerts')}
              >
                View messages
              </Button>
            </Flex>
          </Card>
        </div>
        <div className="col-md-3">
          <Card padding="30px 20px" mb="15px">
            <Flex flexDirection="column" alignItems="center">
              <div className="card-icon__wrapper">
                <Icon name="user" color="#29cb98" />
              </div>
              <Text mt="8px" color="#b0b0b0">
                Total Contacts
              </Text>
              <Heading my="30px" fontWeight="normal" fontSize="32px">
                {contacts.length}
              </Heading>
              <Button
                kind="green"
                block
                onClick={() => history.push('/dashboard/contacts')}
              >
                View contacts
              </Button>
            </Flex>
          </Card>
        </div>
        <div className="col-md-3">
          <Card padding="30px 20px" mb="15px">
            <Flex flexDirection="column" alignItems="center">
              <div className="card-icon__wrapper">
                <Icon name="plant" color="#29cb98" />
              </div>
              <Text mt="8px" color="#b0b0b0">
                Total Advice Models
              </Text>
              <Heading my="30px" fontWeight="normal" fontSize="32px">
                {advice_models.length}
              </Heading>
              <Button
                kind="green"
                block
                onClick={() => history.push('/dashboard/advice-models')}
              >
                View advice models
              </Button>
            </Flex>
          </Card>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <Card className="data-summary__table">
            <Flex
              className="data-summary__table__header"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text>Recently added users</Text>
              <Link to="/dashboard/team">view all</Link>
            </Flex>
            <div className="data-summary__table__body">
              {users.length > 0 ? (
                users.map((user, i) => (
                  <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    key={i}
                  >
                    <TableRowItem>
                      <Avatar
                        isRound
                        size="32px"
                        color="#ff9901"
                        bgColor="rgba(255,153,1,.15)"
                        initial={`${user.first_name[0]}${user.last_name[0]}`}
                        photo_url=""
                      />
                    </TableRowItem>
                    <TableRowItem>
                      {user.first_name} {user.last_name}
                    </TableRowItem>
                    <TableRowItem shouldTruncate>{user.email}</TableRowItem>
                    <TableRowItem>
                      {moment(user.created_at).format('DD MMMM, YYYY')}
                    </TableRowItem>
                  </Flex>
                ))
              ) : (
                <Box p="16px">
                  <Text color="#8c8c8c" fontSize="14px">
                    Your recent users will show here once you add them
                  </Text>
                </Box>
              )}
            </div>
          </Card>
        </div>
        <div className="col-md-6">
          <Card className="data-summary__table">
            <Flex
              className="data-summary__table__header"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text>Recently added contacts</Text>
              <Link to="/dashboard/contacts">view all</Link>
            </Flex>
            <div className="data-summary__table__body">
              {contacts.length > 0 ? (
                contacts.map((contact, i) => (
                  <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    key={i}
                  >
                    <TableRowItem>
                      <Avatar
                        isRound
                        size="32px"
                        color="#ff9901"
                        bgColor="rgba(255,153,1,.15)"
                        initial={`${contact.first_name[0]}${
                          contact.last_name[0]
                        }`}
                        photo_url=""
                      />
                    </TableRowItem>
                    <TableRowItem>{contact.first_name}</TableRowItem>
                    <TableRowItem>{contact.middle_name}</TableRowItem>
                    <TableRowItem>{contact.last_name}</TableRowItem>
                    <TableRowItem>{contact.crop}</TableRowItem>
                  </Flex>
                ))
              ) : (
                <Box p="16px">
                  <Text color="#8c8c8c" fontSize="14px">
                    Your recent contacts will show here once you add them
                  </Text>
                </Box>
              )}
            </div>
          </Card>
        </div>
      </div>
    </HomeContainer>
  );
};

Home.defaultProps = {
  alerts: [],
  users: [
    {
      first_name: 'Johnny',
      middle_name: 'Hakopa',
      last_name: 'Deep',
      email: 'folatunde@gmail.com',
      created_at: '2019-02-25T00:00:00.000Z',
    },
  ],
  contacts: [
    {
      first_name: 'Johnny',
      middle_name: 'Hakopa',
      last_name: 'Deep',
      crop: 'Cashew',
    },
  ],
  advice_models: [],
};

export default Home;
