import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useAuth, AuthProvider } from '../../hooks/auth';
import MockAdapter from 'axios-mock-adapter'
import api from '../../services/api';

const apiMock = new MockAdapter(api);

describe('Auth hook', () => {
  it('should be able to sign in', async () => {
    const apiResponse = {
      user: {
        id: 'user123',
        name: 'Jhon Doe',
        email: 'jhondoe@exemple.com.br',
      },
      token: 'token-123'
    }

    apiMock.onPost('sessions').reply(200, apiResponse);

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.signIn({
      email: 'jhondoe@exemple.com.br',
      password: '123456'
    });

    await waitForNextUpdate();

    expect(setItemSpy).toHaveBeenCalledWith('@GoBarber:token', 'token-123');
    expect(setItemSpy).toHaveBeenCalledWith('@GoBarber:user', JSON.stringify(apiResponse.user));
    expect(result.current.user.email).toEqual('jhondoe@exemple.com.br');

  });

  it('should restore saved daa from storage when auth inits', async () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem').mockImplementation((key) => {
      switch (key) {
        case '@GoBarber:token':
          return 'token-123';
        case '@GoBarber:user':
          return JSON.stringify({
            id: 'user123',
            name: 'Jhon Doe',
            email: 'jhondoe@exemple.com.br',
          });
          default:
            return null;
      }
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.user.email).toEqual('jhondoe@exemple.com.br');
  });

  it('should be able to sing out', async () => {
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation((key) => {
      switch (key) {
        case '@GoBarber:token':
          return 'token-123';
        case '@GoBarber:user':
          return JSON.stringify({
            id: 'user123',
            name: 'Jhon Doe',
            email: 'jhondoe@exemple.com.br',
          });
          default:
            return null;
      }
    });

    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.signOut();
    });

    expect(removeItemSpy).toBeCalledTimes(2);
    expect(result.current.user).toBeUndefined();
  });

  it('should be able to update user data', async () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    const user = {
      id: 'user123',
      name: 'Jhon Doe',
      email: 'jhondoe@exemple.com.br',
      avatar_url: 'image-teste.jpg'
    };

    act(() => {
      result.current.updateUser(user);
    });

    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:user',
      JSON.stringify(user),
    );

    expect(result.current.user).toEqual(user);
  })
});