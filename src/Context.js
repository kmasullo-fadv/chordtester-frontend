import React from 'react'

export default React.createContext({
    notes: [],
    addNote: () => {},
    error: null,
    setError: () => {},
    clearError: () => {},
  })