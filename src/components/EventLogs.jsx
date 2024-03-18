import React from "react";

export default function EventLogs({ eventLogsData }) {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const formatLogToSentence = (log) => {
    const { eventType, userId, productId, quantity, price, timestamp } = log.value;
    let sentence, className;

    switch (eventType) {
      case "ProductAddedToCart":
        sentence = `User ${userId} added ${quantity} of product ${productId} to the cart on ${formatDate(timestamp)}.`;
        className = "added-to-cart";
        break;
      case "ProductViewed":
        sentence = `User ${userId} viewed product ${productId} on ${formatDate(timestamp)}.`;
        className = "viewed";
        break;
      case "ProductPurchased":
        sentence = `User ${userId} purchased product ${productId} for $${price.toFixed(2)} on ${formatDate(timestamp)}.`;
        className = "purchased";
        break;
      case "ProductFavorited":
        sentence = `User ${userId} favorited product ${productId} on ${formatDate(timestamp)}.`;
        className = "favorited";
        break;
      default:
        sentence = "Unknown event.";
        className = "unknown";
    }

    return {sentence, className};
  };

  return (
    <div>
      <h2>Event Logs</h2>
      <div className="event-logs">
        {eventLogsData.map((log, index) => {
          const { sentence, className } = formatLogToSentence(log);
          return (
            <div key={index} className={`log ${className}`}>
              {sentence}
            </div>
          );
        })}
      </div>
    </div>
  );
}