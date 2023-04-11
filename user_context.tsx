import React from 'react';
import { useContext } from 'react';

const UserContext = React.createContext({});
export default function AppWrapper({ children }) {
    const user = {
        id: 0,
        cardCollection: {
            2837: {id: 2837, quantity: 1},
            5693: {id: 5693, quantity: 2},
            9878: {id: 9878, quantity: 1}
        },
        packCollection: {
            0: {id: 0, quantity: 4},
            1: {id: 1, quantity: 2},
            2: {id: 2, quantity: 3},
            4: {id: 4, quantity: 2},
            7: {id: 7, quantity: 1}
        }
        }

    return (
        <UserContext.Provider value = {user}>
            {children}
        </UserContext.Provider>
    )
}

export function useUserContext() {
    return useContext(UserContext);
};