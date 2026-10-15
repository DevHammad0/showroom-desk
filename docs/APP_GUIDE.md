# Showroom Desk: plain language guide to the demo

This guide explains the **current Top Wheels mockup**. It is written for someone who has never worked in a car showroom. The example cars, people and rupee amounts are sample data.

## First, what does a showroom actually do?

In the simplest case, a showroom buys a car from a seller, prepares and displays it, then sells it to a buyer. Money may change hands in several parts. The seller may still be owed some of the purchase price; the buyer may still owe some of the sale price. The showroom also pays for repairs, cleaning, rent and other costs.

The app keeps four related records for that journey:

1. **Vehicle:** Which car is it, where are its papers, and is it available, reserved or sold?
2. **Purchase:** Who supplied the car, what price was agreed, and how much has the showroom paid?
3. **Sale:** Who bought the car, what price was agreed, and how much has the showroom received?
4. **Money entries:** Each payment or expense, including the cash or bank account it affected.

For example, the showroom buys a car for **Rs 4,200,000** and pays the seller **Rs 3,000,000** now. It still owes the seller **Rs 1,200,000**. It spends **Rs 50,000** preparing the car, then sells it for **Rs 4,750,000**. If the buyer pays **Rs 1,500,000** now, the buyer still owes **Rs 3,250,000**. The simple *gross profit on that car* is **Rs 500,000** (sale price − purchase price − preparation cost). That profit figure does **not** mean Rs 500,000 has arrived in the bank; most of the sale price remains to be collected.

## The nine tabs

| Tab | In everyday words | When someone would open it |
| --- | --- | --- |
| **Overview** | A quick summary of the showroom | At the start or end of the day |
| **Inventory** | The list of cars | When checking what can be shown or sold |
| **Purchases** | Deals in which the showroom acquired cars | When buying a car or paying its seller |
| **Sales / POS** | Deals in which the showroom sold cars | When closing a sale, taking payment or printing a sample receipt |
| **People & leads** | Contact book and possible future buyers | When saving a seller, buyer or inquiry |
| **Payables & receivables** | Money still owed in either direction | When following up or recording a later payment |
| **Cash & bank** | Where money came in or went out | When checking account balances and transactions |
| **Expenses** | Money spent on cars or running the showroom | When paying for repair, detailing, rent, etc. |
| **Reports** | Summaries of sales, margin, collections and stock | When reviewing performance |

### 1. Overview

This is the owner's starting screen. **Available stock** counts cars ready for a buyer; **reserved** cars are shown separately. **Sales** means the total agreed selling price of deals in the chosen period. **Gross profit** is an estimate for sold cars before rent, salary and other showroom costs. **To collect** is money buyers still owe, so it is not cash on hand.

The screen also shows recent cars, buyer payments to follow up, recent money movements, and shortcuts for a purchase, sale, person or payment. The **Today / This week / This month / All time** selector affects the period figures; some other cards are current or all-time snapshots. The chart shows recent monthly purchase and sale values. **Reset demo** restores the original sample data in this browser.

### 2. Inventory

Inventory answers: **“Which cars do we have, and what do we know about each one?”** Search by car, registration number, chassis number or color. Filter the list to **Available**, **Reserved** or **Sold**. A car's **stock ID** is the app's own reference, while the registration number is its plate/registration detail.

Open a car to see its make, model, year, color, mileage, registration, chassis and engine numbers; who supplied it; purchase and asking prices; notes; paper checklist; where the physical papers are said to be; and a short history of purchase, expenses and sale. **Asking price** is the price the showroom hopes to get. The eventual agreed sale price may be different. **Stock value** here adds the purchase costs of available and reserved cars; it is not their expected selling value.

**Add vehicle purchase** opens the purchase form because this demo adds a car to stock when its acquisition is recorded. **Create sale** appears on a car that is available or reserved. Paper checkmarks are only entries made in the demo; they do not prove a document is genuine or current.

### 3. Purchases

A purchase is the deal where the showroom **gets a car from a seller**. It records the car, seller, agreed purchase price, purchase date, amount paid immediately, payment account, due date for any balance, notes, and a paper checklist. The form offers **Used**, **New** and **Booking** vehicle types. In this demo, a Booking entry becomes reserved stock; there is no full booking workflow yet.

Saving a purchase adds the car to Inventory and creates a purchase record. If an initial payment was entered, it also reduces the chosen cash or bank account. **Agreed price − payments = balance still owed to the seller.** Open a purchase row to see its payment history and use **Pay seller** for a later payment. **Export CSV** downloads the purchase list for spreadsheet review.

### 4. Sales / POS

POS means the **deal desk** for a car sale here, not a barcode checkout. Select an available or reserved car and a buyer, enter the agreed price, sale date, any money received now, the receiving account, a due date for the rest, delivery status and notes. The form labels deals **Cash**, **Credit** or **Trade-in**. The label describes the deal, but the demo does not force a Cash sale to be paid in full.

Completing the form creates a sale and immediately marks the car **Sold**, even if delivery is marked Pending or the buyer still owes money. An initial receipt increases the chosen cash or bank account. **Agreed sale price − receipts = amount to collect from the buyer.** Open a sale to see the buyer, payment history, remaining balance, vehicle margin and **Print demo receipt**. The printout is a sample, not a tax invoice. **Export CSV** downloads the sales list.

For **Trade-in**, the buyer gives another car as part of the payment. The entered trade-in allowance counts toward the sale settlement. The incoming car also gets its own vehicle and purchase records so it can later be inspected and sold. In the demo, this is an *in-kind* exchange, so that allowance does not move cash between accounts. The incoming car's papers and valuation still need real-world review.

### 5. People & leads

**People** is the contact book for buyers, sellers and other parties. A single person can appear in more than one deal, so their name and phone need not be entered again each time. Add a person with name, phone, primary role, optional CNIC, address and notes. Open a person to see connected purchases and sales, plus separate amounts they owe the showroom and the showroom owes them.

**Leads** are inquiries from people who might buy later. Save their name, phone, car interest, status and notes. **Mark follow up** changes a lead's status to “Follow up.” The demo does not yet schedule reminders or turn a lead into a buyer automatically.

### 6. Payables & receivables

These are the two directions of **unpaid balances**:

- **Receivable / To collect:** a buyer owes the showroom money from a sale.
- **Payable / To pay:** the showroom owes a seller money from a purchase.

Use the two subtabs to view each direction. Each row shows the person, car, deal, due date, agreed total, amount already paid and remaining amount. A past due date is marked **Overdue**. **Record receipt** means the buyer paid the showroom; **Record payment** means the showroom paid the seller. The new entry changes both the deal's remaining balance and the selected account's balance. **Net open balance** is receivables minus payables; it is not the money available in the till.

### 7. Cash & bank

This is a simplified money ledger. Each account card starts with a sample **opening balance**. Its displayed balance then rises with sale receipts and falls with purchase payments and expenses. The transaction list shows date, reason, related deal, account, method, money in and money out.

**Add account** creates another sample cash or bank account. **Transfer** moves an amount between two accounts and creates a matching outgoing and incoming entry. It changes where the money is held, not the showroom's total money. **Export CSV** downloads the ledger. These are records in your browser; the demo does not connect to an actual bank or move real funds.

### 8. Expenses

An expense is money spent by the showroom. **Add expense** asks for a category, amount, date and account used. Link it to a particular car if it was a cost of preparing or selling that car, such as repair or detailing. That cost reduces the demo's gross profit for that car. Leave the vehicle blank for a general showroom cost such as rent or salary; it appears as **showroom overhead** instead. Saving an expense also creates an outgoing entry in Cash & bank. **Export CSV** downloads the expense list.

### 9. Reports

Reports combine the other tabs into a simplified owner view. **Total sale value** is what was agreed on sales, including unpaid amounts. **Gross profit on sold cars** is each car's sale price minus its purchase price and linked vehicle expenses. **Estimated profit after overhead** subtracts recorded general showroom expenses from those gross profits. It is only an estimate and does not account for every tax or accounting adjustment.

**Profit by vehicle** shows the calculation for each sold car. **Expense categories** shows where spending went. **Collections** compares total sale value with receipts actually entered and the amount still due. **Inventory snapshot** counts available and reserved cars and values unsold stock at recorded purchase cost. **Export summary** downloads key figures as CSV. The current Reports screen summarizes the demo data as a whole; it has no report date filter yet.

## Try one complete deal in the demo

1. In **People & leads**, add a seller and a buyer, or use the sample people.
2. In **Purchases**, record a car purchase. Enter less than the full price in **Paid now** so there is a seller balance.
3. In **Inventory**, open the new car and check its price, papers and status.
4. In **Expenses**, add a repair or detailing cost and link it to that car.
5. In **Sales / POS**, sell the car. Enter less than the full price in **Received now** and set a later due date.
6. In **Payables & receivables**, inspect the buyer's balance and the seller's balance. Record a later receipt or payment.
7. In **Cash & bank**, see the corresponding money entries. In **Reports**, see the car's estimated gross profit. Open the sale to print its sample receipt.

## Small glossary

| Term | Meaning |
| --- | --- |
| **Stock / inventory** | Cars recorded by the showroom. |
| **Seller** | Person or business from whom the showroom gets a car. |
| **Buyer** | Person or business to whom the showroom sells a car. |
| **Asking price** | Price advertised or hoped for; it may differ from the final sale price. |
| **Agreed price** | Price settled in a purchase or sale deal. |
| **Token / deposit** | An early part payment. It does not mean the full deal is paid. |
| **Reserved** | A car set aside, usually while a deal or booking is pending. |
| **Receivable** | Money expected from a buyer. |
| **Payable** | Money the showroom must pay a seller. |
| **Gross profit / margin** | Sale price less purchase cost and costs linked to that car in this demo. |
| **Overhead** | General business costs such as rent and salaries. |
| **Trade-in** | A buyer gives another car as part of the sale settlement. |
| **Chassis / VIN** | A vehicle identifier used to distinguish one car from another. |
| **CNIC** | Pakistani identity card number. Optional in this demo. |
| **CSV** | A file that opens in spreadsheet apps. |

## What this mockup does not yet handle

This is a browser-only review tool. Changes stay in the browser where they were made and can be erased with **Reset demo** or by clearing browser storage. Other staff and devices do not share these records. There is no login, real bank connection, government document verification, document upload, formal booking or reservation expiry, approval process, audit history, or production invoice/tax workflow. Some form fields, such as the purchase form's file/PBO number, are present for discussion but are not yet carried into the saved demo record. Use [PRD.md](PRD.md) for the fuller product plan and questions to discuss with the showroom owner.
