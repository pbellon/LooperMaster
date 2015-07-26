import config from './index.config';

import routerConfig from './index.route';

import runBlock from './index.run';
import MainController from './main/main.controller';
import LooperDirective from './components/looper/looper.directive';

angular.module('loopMaster', ['ngAnimate', 'ngTouch', 'ui.router', 'ngMaterial'])
  .directive('looper', ()=> new LooperDirective())
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .controller('MainController', MainController);
