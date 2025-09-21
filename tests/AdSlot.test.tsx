import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdSlot from '../src/AdSlot';

// Mock fetch globally
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('AdSlot Component', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders loading state initially', () => {
    render(<AdSlot placement="homepage_top" />);
    expect(screen.getByText('Loading ad...')).toBeInTheDocument();
  });

  it('renders error state when fetch fails', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    render(<AdSlot placement="homepage_top" />);

    await waitFor(() => {
      expect(screen.getByText('Ad unavailable')).toBeInTheDocument();
    });
  });

  it('renders ad when fetch succeeds', async () => {
    const mockAd = {
      campaignId: 123,
      title: 'Test Ad',
      placement: 'homepage_top',
      format: '728x90',
      img: 'https://example.com/ad.jpg',
      width: 728,
      height: 90,
      alt: 'Test Ad',
      link: 'https://example.com/click',
      impUrl: 'https://example.com/imp',
      userCap: 5,
      pubDate: '2025-01-01T00:00:00Z'
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [mockAd]
    });

    render(<AdSlot placement="homepage_top" />);

    await waitFor(() => {
      expect(screen.getByAltText('Test Ad')).toBeInTheDocument();
    });
  });

  it('applies custom className', () => {
    render(<AdSlot placement="homepage_top" className="custom-class" />);
    expect(screen.getByText('Loading ad...').parentElement).toHaveClass('custom-class');
  });

  it('applies custom styles', () => {
    const customStyle = { margin: '20px' };
    render(<AdSlot placement="homepage_top" style={customStyle} />);
    expect(screen.getByText('Loading ad...').parentElement).toHaveStyle('margin: 20px');
  });

  it('shows custom loading message', () => {
    render(<AdSlot placement="homepage_top" loadingMessage="Custom loading..." />);
    expect(screen.getByText('Custom loading...')).toBeInTheDocument();
  });

  it('shows custom error message', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    render(<AdSlot placement="homepage_top" errorMessage="Custom error" />);

    await waitFor(() => {
      expect(screen.getByText('Custom error')).toBeInTheDocument();
    });
  });
});
