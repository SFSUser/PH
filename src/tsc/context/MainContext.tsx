import React, { useState, createContext, FC } from 'react';

export let Content = {
    values: {
        main: {
            Session: null,
        }
    }
}

export const MainContext = createContext(Content.values);

/**
 * MainContextProvider component
 */
export const MainContextProvider: FC<any> = ({children}) => {
    let [session, setSession ] = useState(null);

    Content.values = {
        main: {
            get Session(): any {
                return session
            },
            set Session(session: any){
                setSession(session)
            },
        }
    }

    return (
        <MainContext.Provider value={Content.values}>
            {children}
        </MainContext.Provider>
    );
}