## Invoice creator app.

First, run the development server:

```bash
npm i
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Implementation

To implement the whole flow, I've decided to use these libraries:

- Next.js 14 with App router
- Tailwind
- React-hook-form
- Tanstack/react-table
- Zod
- date-dns
- UI Library -> Shadcn

All backend data is only stored inside JSON files (would not work on deployed environment). We use middleware (for creating new client) to validate Client schema.

Website is not responsive, as figma didn't show that

## Usage

#### client creation

User starts with selectiong a client from the autocomplete input component (Previous clients pre-filled from JSON API). User can create a new client as well. Client creation doesn't use form hook, just saves new client data into a context and sends it to the backend, after validation with zod (after clicking on create client button & also in the middleware)

Date selection - Issue date is populated with today's date, but can be adjusted. Due date has few options of days, or custom date picker. Selecting 15 days, will result in 15 days from issued date.

Vat exemption, client chooses VAT article, coming from the backend as "appConfig"

Add Items - User can add multiple items (figma only showed one, but I thought usually it's possible to have multiple). Each is selected from input autocomplete, but can only be selected once (can have multiple units)

Additional options - include retention and global discount. (I came up with calculations, not sure if they are correct and what would be the requirement, eg. retention doesn't affect total price and so on..)

Purchase order and Reference are displayed in invoice preview on blur

Summary section shows the calculation for the whole invice. (useCalculatePrice has a lot of comments on how I think the calculations might have been intended.)

During whole proces of filling the invoice, the Preview and Email sections are reflecting the changes done on the form. We can toggle the preview window with a button on the bottom.

After clicking Issue invoice, we populate dialog window to confirm submission. Afterwards we have a confirmation that the invoice was issued (button send invoice = behaviour not implemented). Clicking either of the buttons will redirect us to the detail page of the issued invoice. Here we have a summary and can also mark the invoice as paid.

#### Listing page

on the `/invoices` page, we show all created invoices inside of the `@tanstack/react-table`. All collumns can be filtered `asc/desc`. Clicking on invoice item will redirect to the Invoice detail page. Search input element can be used to filter by client names. With filters buttons we can manipulate the table and show only selected collumns
