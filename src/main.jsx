import React from 'react'
import ReactDOM from 'react-dom/client'
import { Principal } from './components/Principal'
import { ArchivoProvider } from './context/ArchivoProvider'


ReactDOM.createRoot(document.getElementById('root')).render(
    <ArchivoProvider>
        <Principal/>
    </ArchivoProvider>
    
  
)
