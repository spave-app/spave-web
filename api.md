# spave-backend

Backend API for Spave - a marketplace platform to discover and book sports spaces.

## API Endpoints

### Venues

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/venues` | List all venues |
| `GET` | `/venues/{id}` | Get a single venue with its address |
| `GET` | `/venues/{id}/courts` | List all courts for a specific venue |

### Courts

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/courts` | List all active courts (across all venues) |
| `GET` | `/courts/{id}` | Get a single court (includes bookingLink for redirect) |

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/register` | Register a new user (returns JWT) |
| `POST` | `/auth/login` | Login with email and password |

## Key Response Fields

### Venue
- id (UUID)
- name, description, phone, email
- website - venue website URL
- address - nested address object with addressLine1, city, province, postalCode, lat, lng

### Court
- id (UUID)
- name, description
- size - court size (FIVE_A_SIDE, SEVEN_A_SIDE, etc.)
- type - court type (INDOOR, OUTDOOR)
- surface - surface type (TURF, GRASS, etc.)
- bookingLink - URL to redirect users for booking
- priceMin, priceMax - price range
- numberAvailable - number of available courts
- venueId - parent venue UUID

## Notes
- Venue and court endpoints are public (no auth required)
- GET /courts only returns courts where isActive = true
- IDs are UUIDs (e.g. 0b121868-c1b5-4f51-94ac-520ce75074f6)
