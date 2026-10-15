# Top Wheels — Car Showroom Management & POS

**Status:** Draft for owner discovery and demo MVP  
**Location:** Peshawar, Khyber Pakhtunkhwa, Pakistan  
**Last updated:** 15 October 2026  
**Inputs:** Owner's short brief, nine reference screenshots in `images/`, and the official sources listed below. More owner feedback and reference images may change this document.

**Demo implementation:** `dist/` contains the clickable browser mockup. It uses a transparent cutout of the Top Wheels logo image supplied by the user from the showroom's Facebook profile, with the original capture retained as a source asset. See `README.md` for the local run command and review script.

## 1. Product goal

Give a showroom owner one place to see available vehicles, record how each vehicle arrived, close a sale, track money and documents, and follow up on unpaid balances. The first deliverable is a **clickable demo with sample data** that Top Wheels can review. A production system for Top Wheels and other showrooms follows after the actual workflow, forms, accounting treatment, and legal requirements are confirmed.

**POS meaning here:** a vehicle deal desk that records a sale, payments, receipt/invoice, delivery, and remaining balance. It is not a supermarket-style barcode/cart checkout.

### Success for the demo

An owner can walk through a believable car deal from stock entry to sale, see the resulting stock and money changes, and point out missing steps. The demo should make feedback easy, with realistic PKR values and Peshawar showroom terminology. Demo figures must be clearly marked as sample data.

### Success for the eventual product

- A vehicle's status, ownership/consignment basis, paperwork, purchase cost, sale outcome, and audit trail can be found without searching paper files.
- Every customer/supplier balance is traceable to deals and payment entries.
- Cash/bank balances and profit reports reconcile to recorded transactions; receivables are not mistaken for cash or realized profit.
- A showroom can operate in its own isolated workspace with staff permissions, and owners can use it from a phone or desktop.

## 2. Users and operating context

| Role | Main job | Likely access in production |
| --- | --- | --- |
| Owner/admin | Approve deals, review stock, cash, profit, dues, reports, staff | All showroom data and settings |
| Salesperson | Find cars, record leads/bookings, prepare sales, collect customer details | Sales and assigned customers; limited cost/profit visibility |
| Purchase/stock manager | Inspect and acquire vehicles, verify papers, manage keys and location | Inventory and purchases |
| Cashier/accountant | Record receipts/payments, reconcile cash/bank, issue documents | Financial records and reports |
| Customer/buyer/seller/investor | Party to a deal, payment, or custody record | No app access in MVP |

These roles are hypotheses. One person may perform several jobs at Top Wheels.

## 3. End-to-end showroom workflows

1. **Acquire a car:** create a unique vehicle record; record seller/source, purchase agreement, acquisition date, expected cost, payments and balance; inspect condition; verify and store document status; receive car, keys, and papers.
2. **Hold and prepare stock:** mark available/reserved/in preparation; add photos, inspection notes, repair/detailing/transport/transfer expenses, document location, asking price, minimum approved price, and days in stock.
3. **Market and negotiate:** capture inquiry/lead, phone and desired car, quoted price, appointment/test drive, follow-up, booking/token, expiry, and cancellation/refund. Validate whether Top Wheels uses these steps.
4. **Sell:** identify buyer and optional witnesses; select one available vehicle; choose cash, credit/installment, or trade-in deal; calculate vehicle price, discount, fees, trade-in allowance, deposits and amount due; record payment method, account, date and reference; produce sale document/receipt; reserve or mark sold only at the agreed business milestone.
5. **Deliver and transfer:** checklist for keys, plates, documents, delivery date, signatures, ownership transfer status, pending items and the responsible staff member. Record subsequent transfer updates without changing the historical sale.
6. **Collect and pay:** record installment/credit receipts or supplier payments against the original obligation; show due/overdue balances and payment history; allow adjustment, refund, and reversal with reason and permissions.
7. **Close the day/month:** reconcile cash and bank activity, account for expenses, inspect due balances, view unit economics and stock aging, print/export reports.

Potential business models to confirm: outright purchases, consignment/commission sales, investor-funded stock, customer bookings of new vehicles, exchanges/trade-ins, and financing through a third party. Each needs a distinct ownership and profit treatment.

## 4. What the reference screenshots show

The screenshots are **inspiration and evidence of desired workflows, not proof that every control is required**. We should improve the flow and data integrity rather than duplicate the other vendor's interface.

| Image in `images/` | Observed ideas | Product interpretation |
| --- | --- | --- |
| `...10.19.28 PM.jpeg` | Dashboard date filters, purchases, sales, profit, cash in/out, pending amount, collection rate, upcoming payments, quick actions, profit report | A date-aware owner dashboard; every figure links to its underlying deals. Define formulas before implementation. |
| `...10.19.27 PM (3).jpeg` | New/used/booking purchase; file/PBO/registration, make/model/color/chassis/engine/horsepower; paper checklist; document custody; seller/witnesses; full or credit payment | Structured purchase intake and document custody. Required fields depend on stock type. |
| `...10.19.28 PM (1).jpeg` | Purchase detail with vehicle, paper flags, source/witnesses, payment history and notes | Readable vehicle/deal timeline with edit history. |
| `...10.19.27 PM (2).jpeg` | Cash/credit/trade sale; buyer/seller/witnesses; car; notes; payment schedule | Guided sale flow with installment schedule and trade-in handling. |
| `...10.19.28 PM (2).jpeg` | Sale detail with car, buyer, delivery items, seller, payment summary and history | Sale record, delivery checklist, and printable documents. |
| `...10.19.26 PM (1).jpeg` | Per-person payable/receivable totals, detail/history, give/take credit | Party ledger and due follow-up; clarify labels to avoid confusing who owes whom. |
| `...10.19.27 PM (1).jpeg` | Pocket cash, add/remove cash, bank accounts and transaction history | Cash/bank accounts backed by transactions, with transfer and reconciliation. |
| `...10.19.27 PM.jpeg` | Person search by name, father name, caste, CNIC, phone, address; view/edit/delete | One party record may act as buyer, seller, witness, investor, or supplier. Avoid duplicate identity records. Caste should not be collected by default. |
| `...10.19.26 PM.jpeg` | Company/make list with models | Make/model master data; prevent duplicates and allow manual entries. |

## 5. Demo MVP scope

The demo uses sample records and local/demo persistence as appropriate. It must label sample invoices, financial figures and records as **demo**. It does not submit taxes, verify government records, move real money, or issue legally operative invoices.

### P0 — needed to demonstrate the core story

| Area | Demo behavior / acceptance check |
| --- | --- |
| Dashboard | Show stock counts by status, purchases/sales, cash received/paid, receivables/payables, upcoming dues, and a simple profit view for a selected period. Clicking a metric opens matching records. |
| Vehicle inventory | Browse/search/filter by make, model, registration/file, status and price; open a detail page with specs, photos, document checklist, cost/asking price, status and timeline. A car cannot appear as available after a completed sale. |
| Purchase intake | Guided form for new/used/booking; seller; vehicle identity; price; initial payment; paper checklist; document/key location; notes. A valid submission creates a stock item and purchase obligation/payment history. |
| People | Add/search/view buyer, seller and witness records with name, phone, optional CNIC and address; reuse one record in multiple roles. Display sensitive identity numbers masked in lists. |
| Sale/POS | Select available car and buyer; record cash, credit or trade-in example; enter agreed price and one or more payment entries; preview amount due; complete the sample deal and show a printable **demo** receipt/invoice. Prevent selling the same car twice. |
| Dues | Show per-deal and per-person balances, due dates and status; record a sample receipt or payment and update balance, account activity and dashboard. |
| Cash/bank | Show cash and bank account cards, ledger entries, and account-to-account transfer in sample mode. No balance changes without a ledger entry. |
| Expenses/profit | Record a sample showroom or vehicle-linked expense; show a transparent per-car profit calculation and a separate business expense total. Distinguish invoiced, collected, cost, and cash flow. |
| Navigation/UI | Desktop and phone layouts, clear empty states, PKR formatting, searchable tables, visible status badges, quick actions. |

### P1 — useful to discuss in the owner review

- Booking/token flow; lead and follow-up list; test drive and appointment log.
- Document upload preview, missing document reminders, keys/papers handover checklist.
- Installment schedule with overdue reminders and printable payment receipt.
- Sale cancellation/return and payment reversal examples.
- CSV/PDF export and print layouts for stock, deal, party statement, and daily close.
- Urdu labels or bilingual documents if staff/customer workflows need them.

### Later production scope

- Authentication, role permissions, tenant isolation, branch support, backups, import/export, audit log, attachments, encryption and recovery.
- Configurable invoice/receipt templates, tax configuration, and any FBR digital invoicing integration after a qualified tax review.
- Government vehicle verification/transfer integrations only if officially available and authorized; meanwhile store verification reference, date, source and evidence.
- WhatsApp/SMS reminders only with consent and an approved messaging provider.
- Bank reconciliation/import, owner approvals, advanced accounting or accounting-system export.
- Multi-showroom onboarding, subscriptions/billing, white-label branding, support and data migration.

## 6. Core records and fields

| Record | Important fields |
| --- | --- |
| Showroom | Name, address, phone, logo, currency, timezone, invoice numbering, tax registration/configuration if applicable |
| Vehicle | Internal stock ID, make/model/variant, model year, new/used/booking, registration status/number, file/PBO number, chassis/VIN, engine number, color, mileage, fuel/transmission, condition, photos, keys, location, status |
| Party | Name, role(s), phone(s), optional CNIC, father/guardian name if needed for forms, address, notes; company flag for corporate parties |
| Purchase | Vehicle, source party, date, agreement/reference, price and charges, ownership model, witnesses, payment terms, status |
| Sale | Vehicle, buyer, salesperson, date, quoted/agreed price, discount/fees, payment plan, delivery/transfer status, witnesses, notes, immutable document number after finalization |
| Payment | Direction (in/out), amount in PKR, date, method, cash/bank account, reference, related deal or party, entered by, reversal link |
| Expense | Amount, date, category, vehicle link if applicable, paid-from account, receipt, notes |
| Document/custody | Type, received/verified/required state, verification date/source, file, physical location, holder, handed-over date and recipient |
| Audit event | Actor, timestamp, record, action, before/after or reason for change |

Use internal IDs, not registration numbers, as the vehicle's permanent identity: registration/plate details may change. Chassis/VIN should be checked for duplicates within a showroom, with an explicit override path for data errors or a re-acquired vehicle.

## 7. Key business rules and calculations

- Money is stored in integer PKR or precise decimal units; never floating-point arithmetic. Dates use `Asia/Karachi` for display and business-day reports.
- A vehicle may have one active sale at a time. A completed sale removes it from available stock. Reservation has an expiry and cancellation path.
- Each finalized purchase/sale has a stable document number and a history of changes. Destructive deletion of finalized financial activity is replaced by a reversal/void with reason.
- `deal balance = agreed total - applied payments - approved adjustments`; show overpayment separately. A due balance is not a cash balance.
- `account balance = opening balance + posted inflows - posted outflows`, including transfers as paired entries. No free-form “add/remove cash” without reason and traceable entry.
- Example **owned-stock gross profit**: sale price minus purchase price minus vehicle-linked costs minus approved discounts/fees borne by showroom. Report collected cash and outstanding receivable separately. Showroom overhead is a separate expense line; net profit formula must be agreed with the accountant.
- Consignment profit is based on commission/fees and related costs, not the full vehicle sale price. Trade-in creates a separately valued incoming vehicle and a settlement component; do not hide its value inside a discount.
- Tax amount and invoice wording are configurable **only after** confirming Top Wheels' registration and applicable treatment. A demo printout is marked “Sample — not a tax invoice.”
- Missing or unverified papers are prominent at acquisition and delivery. Whether they block a sale is an owner-configurable policy to decide during discovery.

## 8. Information architecture and main screens

1. **Overview:** period selector, KPIs, due list, stock aging, recent deals, quick actions.
2. **Inventory:** searchable vehicle grid/list; vehicle details, expenses, documents, custody, status history.
3. **Purchases:** records, new purchase wizard, purchase detail and payment history.
4. **Sales / POS:** records, new sale wizard, deal summary, invoice/receipt preview, delivery checklist.
5. **People & leads:** parties, linked deals, balance and contact timeline.
6. **Dues:** receivables, payables, installment schedule, payment entry and party statement.
7. **Cash & bank:** accounts, transaction ledger, transfers and daily close.
8. **Expenses & reports:** categories, per-car margin, cash flow, stock aging, sales by period, outstanding balances.
9. **Settings (production):** showroom details, staff permissions, document numbering, make/model catalog, tax settings, data export.

## 9. Nonfunctional requirements for production

- **Privacy/security:** isolate each showroom's data; least-privilege roles; mask CNIC in general lists; encrypted transport and protected storage; secure attachment access; audit sensitive changes; define retention and deletion rules.
- **Reliability:** automatic backups with restore test, idempotent payment posting, database constraints preventing duplicate final sales, clear error recovery.
- **Usability:** responsive for low-cost Android phones and desktop, keyboard-friendly forms, legible printouts, sensible defaults, autosave for long forms if feasible, accessible labels/contrast.
- **Performance:** common lists and dashboard load promptly on typical mobile connections; pagination and search for growing stock/history.
- **Localization:** PKR, Pakistan phone/CNIC formatting where used, `Asia/Karachi`, English first with possible Urdu support. Do not assume every user wants Urdu input.
- **Connectivity:** online web app is the target. Offline capture/sync is a later decision after observing connectivity at the showroom.

## 10. Compliance and external-system notes to validate

The KP dealer rules' transaction register includes transaction date/type, vehicle or other subject, consideration, party particulars, instruments, commission, receipt particulars and signatures. This suggests the product should preserve exportable deal records and signed documents; confirm current applicability and exact retention process with a local professional. [KP rules, Form V](https://kpcode.kp.gov.pk/uploads/The_Khyber_Pakhtunkhwa_Real_Estate_Agents_and_Motor_Vehicles_Dealers_%28Regulation_of_Business%29_Rules_19838.pdf).

KP's official information describes digitized vehicle registration, transfer and verification services. The software should track verification status and external references, but must not claim to verify ownership itself without a supported integration. [KPITB annual report](https://ecitizen.kp.gov.pk/storage/yearbook/KPITBAnnualReport2025.pdf); [KP government dealer announcement, July 2026](https://dgipr.kp.gov.pk/excise-10-7-26/).

FBR says digital invoicing applies to registered persons under its current rules and that integration uses licensed integrators. Whether and how Top Wheels must integrate depends on its registration and business model. Do not hard-code a tax rate or call a generic demo receipt an FBR invoice. [FBR digital invoicing FAQ](https://www.fbr.gov.pk/faqs/173967/173969); [FBR sales tax invoice clarification](https://fbr.gov.pk/sales-tax--to-be-recovered-only-if-the-supplier-is-registered/132123).

## 11. Owner interview and unresolved decisions

1. How many cars enter and leave each month? What share are purchased stock, consignment, booking, or third-party investor cars?
2. Walk through the most recent deal: which paper forms, signatures, witnesses, receipts, and approval steps were used?
3. What exact identifiers and documents differ for new, used, imported, unregistered and booked vehicles? Which are mandatory before purchase, sale and delivery?
4. Does the showroom accept trade-ins, credit/installments, partial payments, token money, or refunds? Who approves discounts and credit?
5. How are bank transfers, cheques, cash, and payments through family/staff accounts recorded today? Is there a daily cash close?
6. What does the owner mean by **profit**: gross profit per vehicle, cash realized, commission, net after overhead, or all of these?
7. Who should see purchase cost and margin? Who can edit a finalized sale, void a receipt, or export CNIC data?
8. Which printed documents must match current Top Wheels stationery? Does the accountant require tax invoices or FBR integration?
9. Does Top Wheels operate one branch? Are other showrooms expected to need separate businesses, branches or shared investor accounts?
10. Which language and devices do staff use? What is the quality of the showroom's internet connection?
11. How are ownership verification and transfer currently done, and who keeps physical files/keys at each stage?
12. Which three reports does the owner use every day, and what decision does each report support?

## 12. Demo review script and sign-off criteria

Use a sample used car in Top Wheels stock. Record its acquisition from a seller, a partial purchase payment, paper status and a refurbishment expense. Show it as available. Record a buyer, reserve it, create a sale with a deposit and due date, preview the sample receipt, complete delivery, then collect the remainder. Review how inventory, party balances, cash/bank activity and gross margin changed. Repeat briefly with a credit sale and a trade-in to expose missing rules.

The demo is ready for owner feedback when every visible total can be explained from sample records, every primary action has a working path, and the user can identify the vehicle's deal and document status without reading a manual. Log all owner corrections in this PRD before committing to a production architecture.
