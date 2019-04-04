/* eslint no-var: "off" */

import './latinise';

function normalizeFileName(fName) {
  var lastExtIndex = fName.lastIndexOf('.');
  var extension = '';
  var normalizedName = fName;

  if (lastExtIndex !== -1) {
    extension = normalizedName.substring(lastExtIndex);
    extension = extension.toLowerCase();

    normalizedName = normalizedName.substring(0, lastExtIndex);
  }

  normalizedName = normalizedName.replace(/[^\x20-\xFF]/g, '');
  normalizedName = normalizedName.latinise();
  normalizedName = normalizedName.toLowerCase();
  normalizedName = normalizedName.replace(/\s|[^A-Za-z0-9]/g, '-');
  normalizedName = normalizedName.replace(/(-)\1+/g, '-');
  normalizedName = normalizedName.replace(/^-|-$/g, '');
  normalizedName = normalizedName === '' ? '-' : normalizedName;

  return normalizedName.concat(extension);
}

module.exports = {
  normalizeFileName,
};
