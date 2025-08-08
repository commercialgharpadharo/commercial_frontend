/* eslint-disable @typescript-eslint/no-explicit-any */
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

type EventOptions = {
  currency?: string;
  value?: number;
  content_name?: string;
  content_type?: string;
  content_ids?: string[];
  content_category?: string;
  predictedLTV?: string;
  [key: string]: any;
};

declare global {
  interface Window {
    fbq: (
      type: string,
      eventName: string,
      options?: EventOptions
    ) => void;
  }
}

// PageView event
export const pageView = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView');
  }
};

// Generic event tracking
export const event = (name: string, options: EventOptions = {}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', name, options);
  }
};

// Property view event
export const trackPropertyView = (property: any) => {
  event('ViewContent', {
    content_type: 'property',
    content_ids: [property._id],
    content_name: property.name,
    content_category: property.accommodationType,
    value: property.rent,
    currency: 'INR',
  });
};

// Booking initiated event
export const trackBookingInitiated = (property: any) => {
  event('InitiateCheckout', {
    content_type: 'property_booking',
    content_ids: [property._id],
    value: property.rent,
    currency: 'INR',
  });
};

// Booking completed event
export const trackBookingCompleted = (booking: any) => {
  event('Purchase', {
    content_type: 'property_booking',
    content_ids: [booking.propertyId],
    value: booking.amount,
    currency: 'INR',
  });
};