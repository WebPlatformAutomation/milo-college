import getMiloLibs from './milo.js';

const config = {
  projectRoot: `${window.location.origin}/`,
  locales: {
    '': { ietf: 'en-US', tk: 'hah7vzn.css' },
    de: { ietf: 'de-DE', tk: 'hah7vzn.css' },
    cn: { ietf: 'zh-CN', tk: 'puu3xkp' },
  },
  miloLibs: getMiloLibs(),
};

const {
  loadStyle,
  decorateArea,
  decorateNavs,
  loadLCP,
  loadArea,
  loadDelayed,
  loadTemplate,
  setConfig,
} = await import(`${config.miloLibs}/utils/utils.js`);

(async function loadPage() {
  loadStyle(`${config.miloLibs}/styles/styles.css`);
  setConfig(config);
  const blocks = decorateArea();
  const navs = decorateNavs();
  await loadLCP({ blocks });
  import(`${config.miloLibs}/utils/fonts.js`);
  loadTemplate();
  await loadArea({ blocks: [...navs, ...blocks] });
  const { default: loadModals } = await import(`${config.miloLibs}/blocks/modals/modals.js`);
  loadModals();
  loadDelayed();
}());
