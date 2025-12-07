---
title: "The Silent Cost of rolling Futures: Contango vs. Backwardation"
description: "Understanding why your commodity ETF might be losing money even when spot prices are rising."
publishDate: 2025-11-08
image: "/images/analytics/rolling-futures.svg"
---

## The Roll Yield Trap

Many retail investors gain exposure to commodities like Oil or VIX through futures-based ETFs. However, few understand the mechanics of **rolling**—selling an expiring contract to buy the next month's contract.

### Contango: Bleeding Returns

When future prices are higher than spot prices (a normal market condition for storable commodities), the market is in **Contango**.

- You sell low (expiring contract).
- You buy high (next month's contract).
- **Result**: Negative roll yield. Over time, this erodes capital even if the spot price stays flat.

### Backwardation: The Wind at Your Back

Conversely, in tight supply markets, future prices may be lower than spot (**Backwardation**). Rolling in this environment generates a positive yield—conceptually similar to a dividend.

**Strategy Note**: Our automated trend-following systems actively monitor the term structure of volatility. We exit long-term hold positions immediately when the curve steepens into severe contango, preserving capital that passive funds lose to friction.
