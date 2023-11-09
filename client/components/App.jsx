import React from 'react'

import PageHeader from './PageHeader.jsx'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import EncodingPage from './EncodingPage.jsx'
import InstructionPage from './InstructionPage.jsx'
import CollectionPage from './CollectionPage.jsx'
import DecodingPage from './DecodingPage.jsx'
import AboutPage from './AboutPage.jsx'
import AccountPage from './AccountPage.jsx'
import LoginPageCenter from './LoginPageCenter.jsx'
import PasswordResetPage from './PasswordResetPage.jsx'
//import DeepLinkHandler from './DeepLinkHandler.jsx';

export const PagesContext = React.createContext(null)

export const CredentialsContext = React.createContext(null)

export default function App (props) {

  const [userId, setUserId] = React.useState("")
  const [userName, setUserName] = React.useState("")
  //const [userPassword, setUserPassword] = React.useState("")
  const [userEmail, setUserEmail] = React.useState("")
  const [loggedIn, setLoggedIn] = React.useState(false)

  return (
    <div style={{textAlign: 'center'}}>
      <CredentialsContext.Provider value={{
        uId: [userId, setUserId],
        uName: [userName, setUserName],
        uEmail: [userEmail, setUserEmail],
        loggedIn: [loggedIn, setLoggedIn]
      }}>
        <BrowserRouter>
        <PageHeader title='Steganography'/>
          <Routes path='/'>
            <Route index element={<AboutPage/>}/>
            <Route path='Instructions' element={<InstructionPage/>}/>
            <Route path='Encoding' element={<EncodingPage/>}/>
            <Route path='Decoding' element={<DecodingPage/>}/>
            <Route path='Collections' element={<CollectionPage/>}/>
            <Route path='Account' element={<AccountPage/>}/>
            <Route path='Login' element={<LoginPageCenter/>}/>
            <Route path='PasswordReset' element={<PasswordResetPage/>}/>

          </Routes>
        </BrowserRouter>
      </CredentialsContext.Provider>
    </div>
  )
}
