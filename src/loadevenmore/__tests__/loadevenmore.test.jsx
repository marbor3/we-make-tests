import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import 'jest-dom/extend-expect';
import LoadEvenMore from '../loadevenmore';

const onClickMock = jest.fn(() => 'clicked');

beforeEach(() => {
  onClickMock.mockClear();
});
afterEach(cleanup);

describe('Load More', () => {
  test('should ', () => {
  });
});
