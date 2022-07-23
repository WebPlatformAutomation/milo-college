const PRODUCTION_DOMAINS = ['college.milo.pink'];

async function loadLibs() {
  window.milo = window.milo || {};
  if (!window.milo.libs) {
    let domain = `https://${PRODUCTION_DOMAINS[0]}`;
    const isProd = window.location.hostname === PRODUCTION_DOMAINS[0];
    if (!isProd) {
      const milolibs = new URLSearchParams(window.location.search).get('milolibs');
      const libStore = milolibs || 'main';
      domain = libStore === 'local' ? 'http://localhost:6456' : `https://${libStore}.milo.pink`;
    }
    window.milo.libs = { base: `${domain}/libs` };
    try {
      const { default: list } = await import(`${window.milo.libs.base}/blocks/list.js`);
      window.milo.libs.blocks = { list };
    } catch (e) {
      console.log('Couldn\'t load libs list');
    }
  }
}
