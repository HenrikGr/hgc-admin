/**
 * Description:
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// react
import React from 'react';
import PropTypes from 'prop-types';

// material-ui
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: "480px",
    marginLeft: '8px',
    marginRight: '8px',
    [theme.breakpoints.up('md')]: {
      maxWidth: '680px',
      marginLeft: '16px',
      marginRight: '16px',
    },
  },
});

/**
 * ClientToolbarTabs
 * @param classes
 * @param items
 * @param selectedId
 * @param onSelect
 * @returns {*}
 * @constructor
 */
function ClientToolbarTabs({ classes, items, selectedId, onSelect }) {
 return(
   <div className={ classes.root }>
     <Tabs
       value={ selectedId === "" ? false : selectedId}
       onChange={ onSelect }
       indicatorColor="primary"
       textColor="primary"
       scrollable
       scrollButtons="auto"
     >
       { items && items.map((item, index) => {
         return(
           <Tab
             key={ index }
             label={ item.name }
             value={ item._id }
           />
         )
       })}
     </Tabs>
   </div>
 )
}

/**
 * Props API
 */
ClientToolbarTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  selectedId: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default withStyles(styles)(ClientToolbarTabs);