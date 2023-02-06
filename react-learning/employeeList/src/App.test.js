import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

test('renders button of type submit', () => {
    const { getByRole, getByDisplayValue } = render(
        <Provider store={store}>
            <App />
        </Provider>
    );

    expect(getByRole('button', { type: /submit/i })).toBeInTheDocument();
});
