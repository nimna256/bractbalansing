interface DiscountRule {
  id: string;
  discount_type: "bulk" | "time_based" | "combined";
  minimum_quantity?: number;
  bulk_discount_percentage?: number;
  bulk_discount_amount?: number;
  start_date?: string;
  end_date?: string;
  time_discount_percentage?: number;
  time_discount_amount?: number;
  is_active: boolean;
}

interface DiscountCalculationResult {
  originalPrice: number;
  discountAmount: number;
  finalPrice: number;
  appliedDiscounts: string[];
}

export function calculateDiscount(
  basePrice: number,
  quantity: number,
  applicableDiscounts: DiscountRule[],
): DiscountCalculationResult {
  let totalDiscountAmount = 0;
  const appliedDiscounts: string[] = [];
  const now = new Date();

  for (const discount of applicableDiscounts) {
    if (!discount.is_active) continue;

    let discountApplies = false;
    let discountAmount = 0;

    switch (discount.discount_type) {
      case "bulk":
        if (
          discount.minimum_quantity &&
          quantity >= discount.minimum_quantity
        ) {
          discountApplies = true;
          if (discount.bulk_discount_percentage) {
            discountAmount =
              (basePrice * quantity * discount.bulk_discount_percentage) / 100;
          } else if (discount.bulk_discount_amount) {
            discountAmount = discount.bulk_discount_amount * quantity;
          }
          appliedDiscounts.push(`Bulk discount: ${quantity}+ items`);
        }
        break;

      case "time_based":
        if (discount.start_date && discount.end_date) {
          const startDate = new Date(discount.start_date);
          const endDate = new Date(discount.end_date);
          if (now >= startDate && now <= endDate) {
            discountApplies = true;
            if (discount.time_discount_percentage) {
              discountAmount =
                (basePrice * quantity * discount.time_discount_percentage) /
                100;
            } else if (discount.time_discount_amount) {
              discountAmount = discount.time_discount_amount * quantity;
            }
            appliedDiscounts.push(`Time-based discount: Active promotion`);
          }
        }
        break;

      case "combined":
        let bulkQualifies = false;
        let timeQualifies = false;

        // Check bulk qualification
        if (
          discount.minimum_quantity &&
          quantity >= discount.minimum_quantity
        ) {
          bulkQualifies = true;
        }

        // Check time qualification
        if (discount.start_date && discount.end_date) {
          const startDate = new Date(discount.start_date);
          const endDate = new Date(discount.end_date);
          if (now >= startDate && now <= endDate) {
            timeQualifies = true;
          }
        }

        // Both conditions must be met for combined discount
        if (bulkQualifies && timeQualifies) {
          discountApplies = true;
          let bulkDiscount = 0;
          let timeDiscount = 0;

          // Calculate bulk discount component
          if (discount.bulk_discount_percentage) {
            bulkDiscount =
              (basePrice * quantity * discount.bulk_discount_percentage) / 100;
          } else if (discount.bulk_discount_amount) {
            bulkDiscount = discount.bulk_discount_amount * quantity;
          }

          // Calculate time discount component
          if (discount.time_discount_percentage) {
            timeDiscount =
              (basePrice * quantity * discount.time_discount_percentage) / 100;
          } else if (discount.time_discount_amount) {
            timeDiscount = discount.time_discount_amount * quantity;
          }

          // For combined discounts, we take the better of the two or stack them
          // Here we'll stack them but cap at 90% of original price
          discountAmount = Math.min(
            bulkDiscount + timeDiscount,
            (basePrice * quantity * 90) / 100,
          );
          appliedDiscounts.push(`Combined discount: Bulk + Time promotion`);
        }
        break;
    }

    if (discountApplies) {
      totalDiscountAmount += discountAmount;
    }
  }

  const originalPrice = basePrice * quantity;
  const finalPrice = Math.max(
    originalPrice - totalDiscountAmount,
    originalPrice * 0.1,
  ); // Minimum 10% of original price

  return {
    originalPrice,
    discountAmount: totalDiscountAmount,
    finalPrice,
    appliedDiscounts,
  };
}

export function formatDiscountSummary(
  result: DiscountCalculationResult,
): string {
  if (result.discountAmount === 0) {
    return `Total: $${result.finalPrice.toFixed(2)}`;
  }

  return `Original: $${result.originalPrice.toFixed(2)}, Discount: -$${result.discountAmount.toFixed(2)}, Final: $${result.finalPrice.toFixed(2)}`;
}
