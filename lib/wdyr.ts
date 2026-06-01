/// <reference types="@welldone-software/why-did-you-render" />
import React from 'react'
import whyDidYouRender from '@welldone-software/why-did-you-render'

if (process.env.NODE_ENV === 'development') {
  whyDidYouRender(React, {
    trackAllPureComponents: false, // opt-in: add `.whyDidYouRender = true` to a component
    logOnDifferentValues: true,
  })
}

export {}
