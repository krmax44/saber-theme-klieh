/* eslint-disable import/no-unassigned-import */

import 'typeface-fira-mono/index.css';
import 'vue-command/dist/vue-command.css';
import './assets/scss/base.scss';
import App from './App.vue';

export default context => {
	context.setRootComponent(App);
};
