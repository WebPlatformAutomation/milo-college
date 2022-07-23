import { getMiloLibs, getMiloBlocks } from './milo.js';

const ROOT = '';

const miloLibs = getMiloLibs();
const miloBlocks = await getMiloBlocks();
const {
  decorateArea,
  getMetadata,
  loadArea,
  loadLCP,
  loadStyle,
} = await import(`${miloLibs}/utils/utils.js`);

function decorateNavs() {
  const selectors = [];
  if (getMetadata('nav') !== 'off') { selectors.push('header'); }
  if (getMetadata('footer') !== 'off') { selectors.push('footer'); }
  const navs = document.querySelectorAll(selectors.toString());
  return [...navs].map((nav) => {
    nav.className = nav.nodeName.toLowerCase();
    return nav;
  });
}

async function loadBlock(block) {
  const { status } = block.dataset;
  if (!status === 'loaded') return block;
  block.dataset.status = 'loading';
  const name = block.classList[0];
  const base = miloBlocks.includes(name) ? miloLibs : ROOT;
  const styleLoaded = new Promise((resolve) => {
    loadStyle(`${base}/blocks/${name}/${name}.css`, resolve);
  });
  const scriptLoaded = new Promise((resolve) => {
    (async () => {
      try {
        const { default: init } = await import(`${base}/blocks/${name}/${name}.js`);
        await init(block);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(`Failed loading ${name}`, err);
      }
      resolve();
    })();
  });
  await Promise.all([styleLoaded, scriptLoaded]);
  delete block.dataset.status;
  const section = block.closest('.section[data-status]');
  if (section) {
    const decoratedBlock = section.querySelector(':scope > [data-status]');
    if (!decoratedBlock) { delete section.dataset.status; }
  }
  return block;
}

(async function loadPage() {
  const blocks = decorateArea();
  const navs = decorateNavs(getMetadata);
  await loadLCP({ blocks, loader: loadBlock });
  loadStyle(`${miloLibs}/fonts/fonts.css`);
  await loadArea({ blocks: [...navs, ...blocks], loader: loadBlock });
  const { default: loadModals } = await import(`${miloLibs}/blocks/modals/modals.js`);
  loadModals();
  // loadDelayed();
}());
