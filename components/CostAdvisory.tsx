import React from 'react';

const CostAdvisory: React.FC = () => {
  return (
    <div className="mt-8 p-4 bg-brand-dark rounded-lg border border-brand-secondary text-sm text-brand-light">
      <h4 className="font-bold mb-2">Cost Advisory</h4>
      <p>
        This app uses your browser's local storage to save data, so there are no running costs for basic tracking. Future AI-powered features (like workout suggestions using Gemini) would involve API calls, which may incur costs based on usage.
      </p>
    </div>
  );
};

export default CostAdvisory;
