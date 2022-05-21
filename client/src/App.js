import React, { useState } from 'react'
import './App.css'

function App() {
  const [account_type, setAccounttype] = useState('standard')
  const [email, setEmail] = useState('')
  const [business_type, setBusinesstype] = useState('individual')
  const [company, setCompany] = useState('')
 
  const handleSubmit = (e) => {
      e.preventDefault()
      console.log("calling API")
      let reqBody = { type: account_type, email: email, business_type: business_type, company : {name: company}}
      const customCap = {capabilities: {
        card_payments: {requested: true},
        transfers: {requested: true},
      }}

      if (account_type == "custom")
        reqBody = {...reqBody, ...customCap}

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqBody)
    }

    fetch('http://localhost:8080/createConnectedAccount', requestOptions)
        .then(response => response.json())
        .then(data => alert('Your Connect Account Id is: ' + data.accountId))
  } 

  return (
    <div className="App">
      <header className="App-header">
      <form className='form' onSubmit={handleSubmit}>
                <div className='form-control'>
                    
                    <h1>Stripe Connect Account Creator</h1>
                    <label htmlFor='type'>Account Type: </label>
                    <select value={account_type} onChange={(e) => setAccounttype(e.target.value)}>
                    <option value="standard">Standard</option>
                    <option value="express">Express</option>
                    <option value="custom">Custom</option>
                    </select>
                    <br/>

                    <label htmlFor='email'>Email: </label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <br/>

                    <label htmlFor='businesstype'>Business Type: </label>
                    <select value={business_type} onChange={(e) => setBusinesstype(e.target.value)}>
                    <option value="individual">Individual</option>
                    <option value="company">Company</option>
                    <option value="non_profit">Non Profit</option>
                    <option value="government_entity">Government Entity</option>
                    </select>
                    <br/>

                    <label htmlFor='company'>Company Name: </label>
                    <input
                        type='text'
                        id='company'
                        name='company'
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        required
                    />
                </div>
                <button type='submit'>Create Connect Account</button>
      </form>
      </header>
    </div>
  )
}

export default App
