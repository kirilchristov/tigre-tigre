# Shopify Bundle Discount Display Plan for Dawn Theme

## Goal

Create a Shopify setup where bundle products show a crossed-out visual price on the product page, while the real bundle discount is applied as a Shopify automatic discount so it appears in cart/checkout savings.

The main goal is:

- Product page shows a visual bundle offer.
- Cart/checkout sees the bundle discount as a real Shopify discount.
- Checkout “You saved” includes the bundle discount.
- No double discounting.
- Products without bundle discounts keep the normal Dawn price display.

## Important Principle

Do not use Shopify compare-at price for bundle products.

Shopify compare-at price is only a visual sale price mechanism. It does not count as a real discount allocation in cart/checkout.

Instead:

- Use metafields for the visual crossed-out price.
- Use Shopify automatic discounts for the real discount.

## Current Business Logic

We have bundle products:

- Single jar
- 3-pack bundle
- 6-pack bundle, to be configured later

The user clicks a bundle on our site and the bundle product is added to Shopify cart/checkout.

The 3-pack should have a 10% automatic discount.
The 6-pack will also receive a discount later, likely higher than the 3-pack.

## Product Pricing Setup

### Single Jar

```text
Price: €7.99
Compare-at price: empty
Automatic discount: none
Metafields: empty
```

Expected display:

```text
€7.99
```

### 3-Pack Bundle

```text
Product price: €23.97
Compare-at price: empty
Automatic discount: 10% off this product
Metafield original price: €23.97
Metafield discounted display: 10% off
Optional metafield label: Bundle discount applied at checkout
```

Expected product page visual display:

```text
~~€23.97~~  €21.57
Bundle discount applied at checkout
```

Expected checkout behavior:

```text
Shopify applies a real €2.40 automatic product discount.
Checkout savings should include this discount.
```

### 6-Pack Bundle

Configure later using the same approach. The 6-pack is a 5+1 deal — one jar free = €7.99 discount.

Example structure:

```text
Product price: full undiscounted 6-pack price (6 × €7.99 = €47.94)
Compare-at price: empty
Automatic discount: €7.99 off this product (fixed amount, one jar free)
Metafield original price: €47.94
Metafield discounted display: €39.95 (actual price customer pays)
Optional metafield label: Bundle discount applied at checkout
```

## Shopify Automatic Discounts Setup

Create automatic product discounts in Shopify Admin.

### 3-Pack Discount

```text
Type: Amount off products
Method: Automatic
Discount value: €2.40 (fixed amount, 10% of €23.97)
Applies to: 3-pack bundle product only
Combinations: allow with free shipping only if we want both discounts to apply
```

### 6-Pack Discount

Create later. The 6-pack is a 5+1 deal — the customer gets one jar free.

```text
Type: Amount off products
Method: Automatic
Discount value: €7.99 (fixed amount, equal to one jar)
Applies to: 6-pack bundle product only
Combinations: allow with free shipping only if we want both discounts to apply
```

## Shopify Metafields

Create product metafields in Shopify Admin:

Path:

```text
Settings → Custom data → Products → Add definition
```

### Metafield 1

```text
Name: Bundle visual original price
Namespace and key: custom.bundle_original_price
Type: Single line text
```

Example for 3-pack:

```text
€23.97
```

### Metafield 2

```text
Name: Bundle visual discounted display
Namespace and key: custom.bundle_discounted_price
Type: Single line text
```

Example for 3-pack:

```text
€21.57
```

Example for 6-pack:

```text
€39.95
```

Important: this field is the actual price the customer pays after the bundle discount. The Liquid template renders it in bold next to the struck-through original price.

### Metafield 3, Optional but Recommended

```text
Name: Bundle discount label
Namespace and key: custom.bundle_discount_label
Type: Single line text
```

Example:

```text
Bundle discount applied at checkout
```

## Display Rule

Only show the custom bundle price if both required metafields are filled:

```text
custom.bundle_original_price
custom.bundle_discounted_price
```

If either is missing, show the normal Dawn price.

This is important because not all products are discounted.

Expected behavior:

| Product        | Metafields Filled? | Display                                       |
| -------------- | ------------------ | --------------------------------------------- |
| Single jar     | No                 | Normal Dawn price                             |
| 3-pack         | Yes                | Custom crossed-out bundle display             |
| 6-pack         | Later              | Custom crossed-out bundle display after setup |
| Other products | No                 | Normal Dawn price                             |

## Theme Code Changes

Work locally on the downloaded Dawn theme before uploading.

Main file to edit:

```text
snippets/price.liquid
```

CSS file to edit:

```text
assets/base.css
```

## Required Change in `snippets/price.liquid`

Inside the `.price__container`, add logic that checks for the bundle metafields.

The structure should be:

```liquid
{% assign bundle_original_price = product.metafields.custom.bundle_original_price.value %}
{% assign bundle_discounted_price = product.metafields.custom.bundle_discounted_price.value %}
{% assign bundle_discount_label = product.metafields.custom.bundle_discount_label.value %}

{% if bundle_original_price != blank and bundle_discounted_price != blank %}

  <div class="bundle-visual-price">
    <span class="bundle-visual-price__compare">
      {{ bundle_original_price }}
    </span>

    <span class="bundle-visual-price__final">
      {{ bundle_discounted_price }}
    </span>
  </div>

  {% if bundle_discount_label != blank %}
    <div class="bundle-visual-price__label">
      {{ bundle_discount_label }}
    </div>
  {% endif %}

{% else %}

  <!-- Keep the original Dawn price__regular and price__sale blocks here -->

{% endif %}
```

## Critical Implementation Detail

Do not render the custom bundle price and the normal Dawn price at the same time.

The current risk is this duplicate display:

```text
~~€23.97~~ 10% off
€23.97
```

That is wrong.

Correct logic:

```text
If bundle metafields exist → show only bundle visual price.
If bundle metafields do not exist → show normal Dawn price.
```

So the original Dawn blocks:

```liquid
<div class="price__regular">
  ...
</div>

<div class="price__sale">
  ...
</div>
```

must be inside the `{% else %}` branch.

## Unit Price Block

If the theme has a unit price block like this:

```liquid
{%- if product.selected_or_first_available_variant.unit_price_measurement -%}
  {% render 'unit-price', price: product.selected_or_first_available_variant.unit_price, measurement: product.selected_or_first_available_variant.unit_price_measurement %}
{%- endif -%}
```

Keep it outside the bundle/normal price conditional if unit price should still show.

If bundle products should not show unit price, this can be reviewed separately.

## CSS Change in `assets/base.css`

Add:

```css
.bundle-visual-price {
  display: flex;
  align-items: baseline;
  gap: 0.8rem;
  margin: 0.6rem 0 0.2rem;
}

.bundle-visual-price__compare {
  text-decoration: line-through;
  opacity: 0.65;
}

.bundle-visual-price__final {
  font-weight: 700;
  font-size: 1.2em;
}

.bundle-visual-price__label {
  font-size: 0.85em;
  opacity: 0.75;
  margin-top: 0.2rem;
}
```

Do not put inline `<style>` blocks inside `price.liquid`.

## Cart Display

Checkout savings are controlled by Shopify. We cannot fully override the checkout savings text without Shopify Plus.

But because the bundle is a real automatic discount, Shopify should include it as a real discount in checkout.

For cart display, optionally add a small note if the cart item product has the bundle discount label metafield.

Files to inspect:

```text
sections/main-cart-items.liquid
sections/main-cart-footer.liquid
snippets/cart-drawer.liquid
snippets/cart-notification-product.liquid
```

Search for:

```text
discount_allocations
line_level_discount_allocations
cart_level_discount_applications
total_discount
```

Optional cart item note:

```liquid
{% assign bundle_discount_label = item.product.metafields.custom.bundle_discount_label.value %}

{% if bundle_discount_label != blank %}
  <div class="cart-item__bundle-note">
    {{ bundle_discount_label }}
  </div>
{% endif %}
```

Suggested CSS:

```css
.cart-item__bundle-note {
  font-size: 0.85em;
  opacity: 0.75;
  margin-top: 0.25rem;
}
```

## Direct Add-to-Cart Flow

The external site should add the actual Shopify bundle product variant to cart.

Recommended behavior:

```text
3-pack button → add 3-pack bundle variant ID
6-pack button → add 6-pack bundle variant ID
```

Then redirect either to:

```text
/cart
```

or directly to:

```text
/checkout
```

Recommendation:

Use `/cart` before checkout if we want the customer to see the cart note and discount messaging.

Use direct `/checkout` if we want the shortest buying flow.

In both cases, the real discount must be a Shopify automatic discount.

## Checkout Limitation

On Shopify Grow / non-Plus:

```text
We cannot fully customize or override Shopify checkout “You saved total”.
```

The correct solution is not to override checkout. The correct solution is to make the bundle saving a real automatic discount, so Shopify recognizes it.

## QA Checklist

### Product Page: Single Jar

Expected:

```text
Shows normal price: €7.99
No crossed-out bundle visual price
No bundle label
No duplicate price
```

### Product Page: 3-Pack

Expected:

```text
Shows visual bundle display: ~~€23.97~~  €21.57
Shows optional label: Bundle discount applied at checkout
Does not show duplicate €23.97 below
Does not use Shopify compare-at price
```

### Product Page: 6-Pack Before Setup

Expected:

```text
Shows normal Dawn price
No crossed-out bundle visual price
```

### Product Page: 6-Pack After Setup

Expected:

```text
Shows visual bundle display based on metafields
Does not show duplicate normal price
Automatic discount applies in checkout
```

### Cart: Single Jar

Expected:

```text
Normal product line
No bundle note
No fake crossed-out display unless intentionally added
No discount allocation
```

### Cart: 3-Pack

Expected:

```text
Product appears in cart
Bundle note may appear if implemented
No Shopify compare-at sale price
Automatic discount may appear if Shopify cart object exposes it before checkout
```

### Checkout: 3-Pack

Expected:

```text
Product price starts from €23.97
€2.40 automatic discount is applied
Customer pays €21.57
Checkout savings includes the real Shopify discount
Free shipping discount still applies if configured and combinable
```

### Double Discount Test

This is wrong:

```text
Product price: €21.57
Compare-at price: €23.97
Automatic discount: 10% off
Final price: discounted again
```

This is correct:

```text
Product price: €23.97
Compare-at price: empty
Automatic discount: 10% off
Metafield visual original price: €23.97
Metafield visual discounted display: 10% off
```

## Acceptance Criteria

Implementation is successful when:

1. Single jar product is unaffected.
2. 3-pack product shows custom crossed-out bundle display.
3. 3-pack product does not show duplicate normal Dawn price.
4. 3-pack checkout applies a real 10% Shopify automatic discount.
5. Checkout savings includes the bundle discount as a real discount.
6. Free shipping still works according to Shopify discount combination settings.
7. 6-pack can be enabled later by filling metafields and creating an automatic discount.
8. No bundle product uses real Shopify compare-at price together with automatic discount.
9. Theme is tested locally before upload.

## Final Recommended Model

| Product    | Shopify Price | Compare-at Price | Metafield Original | Metafield Display | Automatic Discount       |
| ---------- | ------------: | ---------------: | -----------------: | ----------------: | -----------------------: |
| Single jar |         €7.99 |            empty |              empty |             empty |                     none |
| 3-pack     |        €23.97 |            empty |             €23.97 |            €21.57 |         €2.40 (fixed)    |
| 6-pack     |        €47.94 |            empty |             €47.94 |            €39.95 |  €7.99 (fixed, 5+1 deal) |

## Summary

Use metafields only for visual marketing display.
Use Shopify automatic discounts for real checkout savings.
Do not use Shopify compare-at price for bundle products.
Only products with bundle metafields should use the custom bundle price display.
All other products should use the default Dawn price display.
