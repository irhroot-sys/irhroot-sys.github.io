import { describe, expect, it } from 'vitest';
import { composeEnquiryMessage, parseWeightTons, readQuoteDetails } from '../../src/lib/enquiries.js';

describe('composeEnquiryMessage', () => {
  it('returns the visitor text unchanged when there are no details', () => {
    expect(composeEnquiryMessage({ message: '  Need a container next week.  ' })).toBe('Need a container next week.');
  });

  it('puts labelled details ahead of the visitor text', () => {
    expect(composeEnquiryMessage({
      message: 'About 12 tonnes of offcuts.',
      service: 'Container Service',
      location: 'Dammam 2nd Industrial City',
      timing: 'Within a week',
    })).toBe('Regarding: Container Service\nSite location: Dammam 2nd Industrial City\nCollection timing: Within a week\n\nAbout 12 tonnes of offcuts.');
  });

  it('never exceeds the 2000 characters the quote API accepts', () => {
    const composed = composeEnquiryMessage({ message: 'x'.repeat(1800), service: 'Metal Sorting', location: 'L'.repeat(80), timing: 'Recurring collections' });
    expect(composed.length).toBeLessThanOrEqual(2000);
    expect(composed.startsWith('Regarding: Metal Sorting')).toBe(true);
  });
});

describe('parseWeightTons', () => {
  it.each([
    ['12', 12], ['0.1', 0.1], ['1000', 1000], ['2,5', 2.5], ['3.14159', 3.1],
  ])('accepts %s', (input, expected) => {
    expect(parseWeightTons(input)).toBe(expected);
  });

  it.each(['', null, undefined, 'abc', '0', '0.05', '1000.5', '-4'])('leaves out %s', (input) => {
    expect(parseWeightTons(input)).toBeUndefined();
  });
});

describe('readQuoteDetails', () => {
  it('reads the optional fields and drops empty ones', () => {
    const form = new FormData();
    form.set('material', 'Copper');
    form.set('weightTons', '4');
    form.set('location', '   ');
    form.set('timing', '');
    expect(readQuoteDetails(form)).toEqual({ material: 'Copper', weightTons: 4, location: undefined, timing: undefined });
  });
});
