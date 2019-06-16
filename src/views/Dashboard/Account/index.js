import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Box } from "rebass";
import Profile from "./components/profile";
import Organisation from "./components/organisation";
import Billing from "./components/billing";
import TabNav from "../../../components/TabNav";

const getAccountLinks = profile => {
  if (profile.is_customer) {
    return [
      {
        url: "/dashboard/profile/",
        label: "Profile",
        icon: "user",
      },
      {
        url: "/dashboard/profile/organisation",
        label: "Organisation Information",
        icon: "combine--box",
        flex: "0 0 239px",
        max: "239px",
      },
      {
        url: "/dashboard/profile/billing",
        label: "Billing Information",
        icon: "shapes-doc",
        flex: "0 0 204px",
        max: "204px",
      },
    ];
  }
  return [
    {
      url: "/dashboard/profile/",
      label: "Profile",
      icon: "user",
    },
    {
      url: "/dashboard/profile/organisation",
      label: "Organisation Information",
      icon: "combine--box",
      flex: "0 0 239px",
      max: "239px",
    },
  ];
};

export default class Account extends Component {
  render() {
    const { profile, clearAllState, history, dispatch, actions, assets } = this.props;

    return (
      <Box py="40px" px="40px">
        <Box>
          <TabNav links={getAccountLinks(profile)} useNavLink>
            <>
              <Route
                exact
                path="/dashboard/profile/"
                render={props => (
                  <Profile
                    {...{ props, dispatch, actions, profile }}
                    clearAllState={() => clearAllState(history)}
                  />
                )}
              />
              <Route
                path="/dashboard/profile/organisation"
                render={props => (
                  <Organisation
                    {...{ props, dispatch, actions, assets, profile }}
                  />
                )}
              />
              <Route
                profile={profile}
                path="/dashboard/profile/billing"
                render={props => (
                  <Billing
                    {...{ props, dispatch, actions, profile }}
                  />
                )}
              />
            </>
          </TabNav>
        </Box>
      </Box>
    );
  }
}
