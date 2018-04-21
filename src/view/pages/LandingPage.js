/**
 * Description: Landing page component
 *
 * Container component for the landing page
 *
 * Container components receives state trough props, supply
 * changes to the the presentation layer and update states
 * to the store.
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

import React from 'react';
//import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'


const LandingPage = ({...rest}) => (
  <div>
    <h2>REACT_APP_API_URL</h2>
    <div>{process.env.REACT_APP_API_URL}</div>
  </div>
);

export default LandingPage;