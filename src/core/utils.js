export const generateRandomId = (length = 10) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let text = '';

  for (let i = 0; i < length; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

export const subset = (sub = [], set = {}) => {
  const subsetResult = {};

  sub.forEach((item) => {
    if (typeof set[item] !== 'undefined') {
      subsetResult[item] = set[item];
    }
  });

  return subsetResult;
};


export const createElement = (tagName, id) => {
  const node = document.createElement(tagName);

  node.setAttribute('id', id);

  return node;
};

export const appendElement = (node, target = document.body) => {
  target.appendChild(node);
};

export const createIframe = (iframeId, callingUrl) => {
  const iframe = createElement('iframe', iframeId);

  iframe.style.display = 'none';
  iframe.setAttribute('src', callingUrl);

  return iframe;
};

export const getDomain = () => {
  let domain = document.location.origin;

  if (typeof domain === 'undefined') {
    // IE
    domain = `${window.location.protocol}//${window.location.host}`;
  }

  return domain;
};

export const getParameterByName = (paramName, paramUrl) => {
  let url = paramUrl;
  let name = paramName;

  if (!url) {
    url = window.location.href;
  }

  name = name.replace(/[[\]]/g, '\\$&');

  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);

  if (!results) {
    return null;
  }

  if (!results[2]) {
    return '';
  }

  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

export const decodeEntities = (() => {
  // this prevents any overhead from creating the object each time
  const element = document.createElement('div');

  function decodeHTMLEntities(str) {
    let entity = str;

    if (entity && typeof entity === 'string') {
      // strip script/html tags
      entity = entity.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
      entity = entity.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
      element.innerHTML = entity;
      entity = element.textContent;
      element.textContent = '';
    }

    return entity;
  }

  return decodeHTMLEntities;
})();
