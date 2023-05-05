# Restaurant POS

# Introduction
- Create an Restaurant
- Create Menu
- Create QR Code for the Menu
- Create Tables
- Add option to generate invoice per table
- Save invoice to database

# Flow
- Customer comes into the Restaurant.
- Customer scanns QR code at the table.
- Restaurant checks table availability.
- Load menu list to the customer.
- Customer picks menu and orders.
- After customer is done - finish order and request invoice (to pay).
- New Invoice is generated and table is available for new customers.
- For previous customer - new popup shows to rate the restaurant.   

# From the Restaurant Owner Point of the view
- After logging in Restaurant Owner can
  - Create/Read/Update/Delete Menu/s
  - Create/Read/Update/Delete Table/s
  - Create/Read/Update/Delete Cart/s
  - Create/Read/Update/Delete Menu Item/s
  - Create/Read Invoice/s
  - Create/Read/Update Restauran/s
- Display Tables Order Info (For Kitchen mostly) and what is fulfilled / on waiting

# Database:

## User
- Name      : String Required
- Email     : String Required

## Restaurant
- Name        : String Required
- Description : String Required
- Logo        : String Required
- User        : Object Required

## Menu
- Name        : String Required
- Description : String Required
- Menu Items  : Object Array

## Menu Item
- Name        : String Required
- Description : String Required
- Price       : Float Required
- Photo       : String Required
- 
## Table
- Status : String Required

# Cart
- Table     : Object Required
- Menu Item : Object Required
- Qty       : Int Required

## Invoice
- Cart  : Object Required
- Total : Float Required

# Additionals
Include Blockchain wallet and possibility of using crypto


### Install dependencies

```
# Backend deps
npm install

# Frontend deps
cd frontend
npm install
```

### Run Server

```
npm run server
```