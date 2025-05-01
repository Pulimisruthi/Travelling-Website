import React from 'react';
import './BudgetTipCard.css';

const BudgetTipCard = () => {
  const tips = [
    "Travel during off-season for better deals",
    "Use public transport to save money",
    "Eat at local restaurants for authentic and affordable food",
    "Book accommodations in advance for discounts"
  ];

  return (
    <div className="budget-tip-card">
      <h3>Budget Travel Tips</h3>
      <ul>
        {tips.map((tip, index) => (
          <li key={index}>{tip}</li>
        ))}
      </ul>
      <button className="btn btn-white">Calculate Your Budget</button>
    </div>
  );
};

export default BudgetTipCard;