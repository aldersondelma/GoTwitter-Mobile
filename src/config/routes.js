import React from 'react';
import { createStackNavigator } from 'react-navigation';

import Login from '../scenes/Login/Login';
import Timeline from '../scenes/Timeline/Timeline';
import New from '../scenes/New/New';

const Routes = createStackNavigator({
    Login,
    Timeline,
    New
});

export default Routes;