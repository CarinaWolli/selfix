import React from 'react';

import { Switch, withRouter } from 'react-router-dom';
import RouteWithSubRoutes from '../RouteWithSubRoutes';
import ContentManagementMenu from '../components/cms/ContentManagementMenu';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import AffiliateProductService from '../services/AffiliateProductService';
import { connect } from 'react-redux';
import { setAffiliateCount } from '../redux/actions/affiliateCountAcions';

const AdminView =({ routes,history,setAffiliateCountRedux }) => {
  const user = useSelector((state) => state.user);
  if (user.user != null) {
    if (user.user.role != 'admin') {
      return <Redirect to='/login'/>;
    }
  } else {
    return <Redirect to='/login'/>;
  }

  React.useEffect(async () => {
    try {
      const count = await AffiliateProductService.getUnmappedAffiliateProductCount();
      setAffiliateCountRedux(count);
    } catch(err) {
      console.log(err);
    }
  }, []);

  if(history.location.pathname === '/admin' || history.location.pathname === '/admin/') {
    history.push('/admin/bicycles');
  }

  return ( 
    <div style={{ height: '100%' }}>
      <ContentManagementMenu />
      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAffiliateCountRedux: (count) => dispatch(setAffiliateCount(count)),
    dispatch
  };
};

export default withRouter(connect(null,mapDispatchToProps)(AdminView));