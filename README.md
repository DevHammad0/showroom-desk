# Top Wheels showroom mockup

A clickable, browser-only demo for discussing Top Wheels' showroom workflow in Peshawar. It covers inventory, purchases, sales/POS, people and leads, payables and receivables, cash and bank, expenses, reports, printable sample sale receipts, and CSV exports.

New to showroom operations? Read the [plain language app guide](docs/APP_GUIDE.md) for what each tab does and a complete example deal.

## Run locally

From this directory:

```powershell
python -m http.server 4173 --directory dist
```

Open `http://localhost:4173/`. The site is plain HTML, CSS and JavaScript, so there is no dependency installation or build step.

The demo starts with sample records. Changes are saved to this browser's `localStorage`; use **Reset demo** in the overview to restore the original sample. Records do not sync across browsers or devices. No real money moves, no government verification takes place, and printed receipts are marked as samples rather than tax invoices.

## Suggested owner walkthrough

1. Open a vehicle in **Inventory** and review its paper checklist and source.
2. Use **Purchases → New purchase** to add a car with a partial payment.
3. Use **Sales / POS → New sale** to sell that car on credit, then inspect its sample receipt.
4. Record the remaining payment from **Payables & receivables**.
5. Check the resulting account balance, per-car margin and dashboard figures.
6. Try a trade-in sale to see a separate incoming vehicle record.

Capture every correction to the forms, calculations and print layout in [docs/PRD.md](docs/PRD.md) before production development.

## Branding note

The demo uses the Top Wheels logo image supplied by the user from the showroom's Facebook profile. A transparent cutout is used in the sidebar and sample receipt; the supplied image is kept alongside it as the source. The black and yellow palette is based on that logo. A clean original logo file can replace the profile capture later.

## Scope boundary

This is a review mockup, not a production system. It has no sign-in, server database, tenant isolation, backups, audit log, live document upload, tax calculation or FBR integration. See the PRD for production requirements and decisions to confirm with the owner and accountant.
