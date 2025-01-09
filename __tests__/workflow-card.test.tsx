import React from 'react'
import { render, screen } from '@testing-library/react'
import { WorkflowCard } from '@/components/workflow-card'

describe('WorkflowCard', () => {
  const mockProps = {
    slug: 'test-workflow',
    title: 'Test Workflow',
    description: 'This is a test workflow',
    imageSrc: '/test-image.jpg',
    tag: 'Test'
  }

  it('renders correctly', () => {
    render(<WorkflowCard {...mockProps} />)
    
    expect(screen.getByText('Test Workflow')).toBeInTheDocument()
    expect(screen.getByText('This is a test workflow')).toBeInTheDocument()
    expect(screen.getByText('Test')).toBeInTheDocument()
    expect(screen.getByAltText('Test Workflow workflow diagram')).toBeInTheDocument()
  })
})

