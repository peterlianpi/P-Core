// Example of using dynamic import in Next.js for performance optimization
// This pattern helps split large or rarely-used components out of the main bundle
// and only loads them when needed, improving compile and runtime performance.

import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import a heavy component (replace with your actual component path)
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  // Set ssr: false if the component should only render on the client
  ssr: false,
  // Optionally, show a loading spinner while loading
  loading: () => <div>Loading...</div>,
});

export default function DynamicExample() {
  return (
    <div className="p-4 border rounded bg-muted">
      <h2 className="text-lg font-bold mb-2">Dynamic Import Example</h2>
      {/* HeavyComponent will only be loaded when this is rendered */}
      <HeavyComponent />
    </div>
  );
}
