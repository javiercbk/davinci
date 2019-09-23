import Vue from 'vue';
import { decimal } from './decimal';
import { unitTransform } from './unit';

Vue.filter('decimal', decimal);
Vue.filter('unitTransform', unitTransform);
