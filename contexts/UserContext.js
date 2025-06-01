import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser ] = useState({ id: '', name: '' });

    return (
        <UserContext.Provider value={{ user, setUser  }}>
            {children}
        </UserContext.Provider>
    );
};