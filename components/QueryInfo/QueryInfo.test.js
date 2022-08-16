import React from 'react'
import QueryInfo from './'
import { render, screen } from '@testing-library/react'

// Imported to be able to use .toBeInTheDocument()
import '@testing-library/jest-dom'

describe('QueryInfo component', () => {
  it('should display successful state', () => {
    expect.assertions(1)

    render(
      <QueryInfo
        data={{
          name: 'noob'
        }}
        loading={false}
        error={''}
        texts={{
          loading: 'Loading message...',
          errorTitle: 'An error occurred because of'
        }}
        DataMessage={() => <span>Submitted successfully</span>}
      />
    )

    expect(screen.getByText('Submitted successfully')).toBeInTheDocument()
  })

  it('should display loading state', () => {
    expect.assertions(1)

    render(
      <QueryInfo
        data={{
          name: 'noob'
        }}
        loading={true}
        error={''}
        texts={{
          loading: 'Loading message...',
          errorTitle: 'An error occurred because of'
        }}
        DataMessage={() => <span>Submitted successfully</span>}
      />
    )

    expect(screen.getByText('Loading message...')).toBeInTheDocument()
  })

  it('should display error state', () => {
    expect.assertions(1)

    render(
      <QueryInfo
        data={{
          name: 'noob'
        }}
        loading={false}
        error={'Missing arguments'}
        texts={{
          loading: 'Loading message...',
          errorTitle: 'An error occurred because of'
        }}
        DataMessage={() => <span>Submitted successfully</span>}
      />
    )

    expect(
      screen.getByText('An error occurred because of: Missing arguments')
    ).toBeInTheDocument()
  })

  it('should set default success message', () => {
    expect.assertions(1)

    render(
      <QueryInfo
        data={{
          name: 'noob'
        }}
        loading={false}
        error={''}
        texts={{
          loading: 'Loading message...',
          errorTitle: 'An error occurred because of'
        }}
      />
    )

    expect(
      screen.getByText('Submitted the item successfully!')
    ).toBeInTheDocument()
  })

  it('should render nothing when there is no data, error, and loading', () => {
    expect.assertions(2)

    render(
      <QueryInfo
        data={undefined}
        loading={false}
        error={''}
        texts={{
          loading: 'Loading message...',
          errorTitle: 'An error occurred because of'
        }}
      />
    )

    expect(
      screen.queryByText('Submitted the item successfully!')
    ).not.toBeInTheDocument()
    expect(screen.queryByText('Loading message...')).not.toBeInTheDocument()
  })
})
