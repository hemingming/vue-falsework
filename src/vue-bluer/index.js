/*!
 * vue-bluer
 * (c) 2017 chen peng
 * Released under the MIT License.
 */
import Swipeout from './swipeout/swipeout'
import SwipeoutItem from './swipeout/swipeout-item'
import SwipeoutButton from './swipeout/swipeout-button'
import tabContainer from './tab-container/index'
import tabContainerItem from './tab-container-item'
import Bar from './bar'

import Toast from './toast'
import Modal from './modal/modal'
import ModalJs from './modal'
import Navbar from './navbar'
import TabItem from './tab-item'
import Cell from './cell'
import scrollRecord from './route-data/scroll-record'
const install = function(Vue) {
  if (install.installed) return;
  // bl-switch
  Vue.component('blSwitch', resolve => {
    require(['./switch'], resolve)
  });
  // bl-button
  Vue.component('blButton', resolve => {
    require(['./button'], resolve)
  });
  // bl-actionsheet
  Vue.component('blActionsheet', resolve => {
    require(['./actionsheet'], resolve)
  });
  // bl-popup
  Vue.component('blPopup', resolve => {
    require(['./popup'], resolve)
  });
  // bl-slide
  Vue.component('blSlide', resolve => {
    require(['./slide'], resolve)
  });
  // bl-picker
  // Vue.component('blPicker', resolve => {
  //   require(['./picker/picker'], resolve)
  // });
  // bl-datetime-picker
  // Vue.component('blDatetimePicker', resolve => {
  //   require(['./datetime-picker'], resolve)
  // });
  // bl-address-picker
  // Vue.component('blAddressPicker', resolve => {
  //   require(['./address-picker'], resolve)
  // });
  // bl-select-picker
  // Vue.component('blSelectPicker', resolve => {
  //   require(['./select-picker'], resolve)
  // });

  Vue.component('bl' + tabContainer.name, tabContainer);
  Vue.component('bl' + tabContainerItem.name, tabContainerItem);
  Vue.component('bl' + Cell.name, Cell);
  Vue.component('bl' + Bar.name, Bar);
  Vue.component('bl' + Navbar.name, Navbar);
  Vue.component('bl' + TabItem.name, TabItem);
  Vue.component('bl' + Modal.name, Modal);
  Vue.component('bl' + Swipeout.name, Swipeout);
  Vue.component('bl' + SwipeoutItem.name, SwipeoutItem);
  Vue.component('bl' + SwipeoutButton.name, SwipeoutButton);

  window.$toast = Vue.$toast = Vue.prototype.$toast = Toast;
  Vue.$modal = Vue.prototype.$modal = ModalJs;

  Vue.directive('scroll-record', scrollRecord)
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};

export default install
