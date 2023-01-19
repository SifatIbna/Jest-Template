import '@testing-library/jest-dom'
import App from '../src/App';
import { render, screen } from '@testing-library/react';

import renderer from 'react-test-renderer'
import { classSpy, spyOnClass } from './utils/mock-utils';

// If you import ClassName, this must come before the import.
spyOnClass('../../src/utils/CustomError', 'ClassName');

import { CustomError } from '../src/utils/CustomError';


describe('Rendering Component', () => {
  test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });
})

describe('Render component', () => {
  test('should render component properly', () => {
    const componentRenderer = renderer.create(<App />);
    const tree = componentRenderer.toJSON();
    expect(tree).toMatchSnapshot();
  });
});



test('this', () => {
    new CustomError({
      statusCode:404,
      statusText:"test"
    });
    expect(classSpy.CustomError.constructor).toHaveBeenCalled();
    // expect(classSpy.ClassName.someMethod).toHaveBeenCalled();
});