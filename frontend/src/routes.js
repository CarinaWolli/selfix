import UserLoginView from './views/UserLoginView';
import SignUpView from './views/SignUpView';
import BikeSearchList from './views/BikeSearchList';
import LandingPage from './views/LandingPage';
import CategorySearchList from './views/CategorySearchList';
import BikeResult from './views/BikeResult';
import Tutorial from './views/Tutorial';
import AdminView from './views/AdminView';
import TutorialCreation from './views/TutorialCreation';
import BicyclesAdmin from './views/BicyclesAdminView';
import TutorialsAdmin from './views/TutorialsAdminView';
import AffiliateMappingView from './views/AffiliateMappingView';
import ShopComponentView from './views/ShopComponentAdminView';
import ToolOptionsAdminView from './views/ToolOptionAdminView ';

const routes = [
  {
    path: '/',
    component: LandingPage,
    exact: true,
  },
  {
    path: '/admin',
    component: AdminView,
    routes: [              
      {
        path: '/admin/bicycles',
        component: BicyclesAdmin,
      },
      {
        path: '/admin/tutorials',
        component: TutorialsAdmin,
      },
      {
        path: '/admin/tutorialCreation/:tutorial?',
        component: TutorialCreation,
      },
      {
        path: '/admin/affiliate',
        component: AffiliateMappingView
      },
      {
        path: '/admin/shopComponents',
        component: ShopComponentView
      },
      {
        path: '/admin/toolOptions',
        component: ToolOptionsAdminView
      }
    ],
  },
  {
    path: '/login',
    component: UserLoginView,
  },
  {
    path: '/register',
    component: SignUpView,
  },
  {
    path: '/search/:searchString',
    component: BikeSearchList,
  },
  {
    path: '/categorySearch/:bikeType/:brand',
    component: CategorySearchList,
  },
  {
    path: '/bike/:id',
    component: BikeResult,
  },
  {
    path: '/tutorial/:id/:componentId?',
    component: Tutorial,
  },
];

export default routes;
