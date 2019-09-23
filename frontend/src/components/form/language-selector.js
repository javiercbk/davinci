import Multiselect from 'vue-multiselect';
import store from '../../store';
import { i18n } from '../../i18n';

export default {
  functional: true,
  render (h, ctx) {
    const languageList = store.getters['languages/languageList'];
    return h(Multiselect, {
      props: {
        options: languageList,
        trackBy: 'value',
        label: 'name'
      },
      model: ctx.data.model,
      scopedSlots: {
        noResult: () => i18n.t('form.notFound', { entity: i18n.tc('entities.language', 2).toLowerCase() })
      }
    });
  }
};
