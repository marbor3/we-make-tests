import React from 'react';
import { render, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';
import Icon from '../icon';

afterEach(cleanup);

describe('Icon', () => {
  test('should be created with default icon.', () => {
    const { getByTestId } = render(<Icon />);

    expect(getByTestId('use')).toHaveAttribute('xlink:href', `${window.assetsBasePath}/clientlibs/redesign/img/base.svg#news-tag`);
  });

  test('should be created with the icon and class name given.', () => {
    const { getByTestId } = render(<Icon iconName="favourite" className="icon-class" />);

    expect(getByTestId('use')).toHaveAttribute('xlink:href', `${window.assetsBasePath}/clientlibs/redesign/img/base.svg#favourite`);
    expect(getByTestId('svg')).toHaveClass('icon-class');
  });
});
