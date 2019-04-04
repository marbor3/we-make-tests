import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import 'jest-dom/extend-expect';
import { normalizeFileName } from '../FileNormalize';

const fileNames = [
  { original: 'Title.jpg', normalized: 'title.jpg' },
  { original: '-TiTLE-.jpg', normalized: 'title.jpg' },
  { original: '-Second title-.jpg', normalized: 'second-title.jpg' },
  { original: '-Third  title-.jpg', normalized: 'third-title.jpg' },
  { original: '-FoURTH&TITLE.jpg', normalized: 'fourth-title.jpg' },
  { original: '東海林.jpg', normalized: '-.jpg' },
  { original: '-ŁódźAb-C.jpg', normalized: 'odab-c.jpg' },
  { original: '-Łódź&*(Ab-C.jpg', normalized: 'od-ab-c.jpg' },
  { original: 'imØagë.jpg', normalized: 'imoage.jpg' },
  { original: 'imØagë', normalized: 'imoage' },
  { original: '-------Iëëëë&magë---___---.jpg', normalized: 'ieeee-mage.jpg' },
];

describe('UploadDialog', () => {
  test('should normalize uploaded file name', async () => {
    const { getByTestId } = render(
      <input data-testid="upload" type="file" />,
    );
    const imageInput = getByTestId('upload');

    fileNames.forEach((name) => {
      const file = new File(['(⌐□_□)'], name.original, { type: 'image/jpg' });

      Object.defineProperty(imageInput, 'files', { configurable: true, value: [file] });
      fireEvent.change(imageInput);

      const normalizedName = normalizeFileName(imageInput.files[0].name);

      expect(normalizedName).toBe(name.normalized);
    });
  });
});
