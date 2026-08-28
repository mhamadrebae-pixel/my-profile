# Visit Nawroli - Nawroli Tourism Website

## Creator

Created by: Mhamad Rebar  
Profile: https://mhamadrebae-pixel.github.io/my-profile/  
Role: Web Developer / Designer

## Purpose

This project is a lightweight, mobile-first tourism website for **Nawroli** in **Halabja, Kurdistan Region, Iraq**.  
It highlights the location's natural scenery, river atmosphere, family-friendly experience, and tourism services such as water houses, rental houses, boats, jet ski, food, and drinks.

The codebase is intentionally simple and future-ready so it can later grow into a full tourism platform with bookings and administration tools.

## Folder Structure

```text
nawroli-tourism/
├── index.html
├── service-details.html
├── css/
│   ├── style.css
│   └── responsive.css
├── js/
│   ├── data.js
│   └── app.js
├── images/
│   ├── hero.jpg
│   ├── nature.jpg
│   ├── landscape.jpg
│   └── activity.jpg
└── README.md
```

## How to Run

1. Open the `nawroli-tourism` folder.
2. Double-click `index.html` to open it in a browser.
3. For the best local development workflow, you can also run it with any simple static server.

Example options:

- VS Code Live Server
- `python -m http.server`
- Any local Apache/Nginx/static hosting environment

## Project Features

- Clean and lightweight structure
- Mobile-first layout
- RTL support for Kurdish content
- Soft green/blue nature-inspired visual design
- Dynamic service cards generated from `data.js`
- Service details page for every service
- Lazy-loaded images
- Smooth scrolling navigation
- Simple lightbox gallery
- Google Maps embed placeholder
- Clear separation between content, styles, and behavior

## Future Improvements

- Admin panel for managing services, pricing, and contact details
- Real booking system with availability management
- Multi-language support (Kurdish, Arabic, English)
- Backend integration with database and API
- Authentication for administrators
- Analytics dashboard for tourism performance
- Real social media links and inquiry forms

## Notes for Expansion

- `js/data.js` can later be replaced by API responses or database-driven content.
- The services section is structured so cards can be updated without changing the HTML layout.
- Service details page added. Each service can now have deeper information, gallery, video placeholder, map placeholder, owner info, and booking link.
- The CSS is split into base styles and responsive enhancements to keep maintenance easier.
- The project is framework-free to stay fast and easy to deploy.
