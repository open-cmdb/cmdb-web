import Select from './src/select';
import TmmSelect from './src/tmm-select';

/* istanbul ignore next */
Select.install = function(Vue) {
  Vue.component(Select.name, Select);
  Vue.component(TmmSelect.name, TmmSelect);
};

export default Select;
