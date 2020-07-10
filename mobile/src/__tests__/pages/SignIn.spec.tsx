import React from 'react';
import SingIn from '../../pages/SignIn';
import { render } from 'react-native-testing-library';

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: jest.fn(),
  }
});

describe('SingIn Page', () => {
  it('should be constains email/password inputs', async () => {
    const { getByPlaceholder } = render(<SingIn />);

    expect(getByPlaceholder('E-mail')).toBeTruthy();
    expect(getByPlaceholder('Senha')).toBeTruthy();
  });
});