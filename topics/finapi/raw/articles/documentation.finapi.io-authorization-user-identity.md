---
title: "Authorization and Creation of a User Identity"
source: https://documentation.finapi.io/access/authorization-and-creation-of-a-user-identity
date: 2026-04-11
type: documentation
tier: 1
---

# Authorization and Creation of a User Identity

finAPI follows the OAuth 2.0 Standard. Two actor types:
- **Client** = your application (uses client_id + client_secret)
- **User** = an end-user within your application (uses username + password)

Every service call must be authorized by an `access_token`.

## Step 1: Get authorized as a client (Client Token)

    POST /oauth/token
    grant_type=client_credentials
    client_id=<your_client_id>
    client_secret=<your_client_secret>

Response:
```json
{
  "access_token": "fnsXpguIBkChhCsN8bVty...",
  "token_type": "bearer",
  "expires_in": 3599,
  "scope": "all"
}
```

Use this token to create users and manage client-level operations.

## Step 2: Create an Access user

Requires client access_token from Step 1.

    POST /api/v1/users
```json
{
  "id": "username",
  "password": "password",
  "email": "email@localhost.de",
  "phone": "+49 99 999999-999",
  "isAutoUpdateEnabled": false
}
```

Response contains the user's credentials (password returned in plaintext — store securely).

## Step 3: Get authorized as a user (User Token)

    POST /oauth/token
    grant_type=password
    client_id=<your_client_id>
    client_secret=<your_client_secret>
    username=<user_id>
    password=<user_password>

Response:
```json
{
  "access_token": "nnsXpguIBkChhCsN8bVty...",
  "token_type": "bearer",
  "expires_in": 3599,
  "scope": "all"
}
```

This user access_token is required for all user-context operations including:
- Creating Web Form 2.0 payment flows
- Getting web form status
- Checking payment status

## Key Distinction

- **Client token**: admin-level, for creating/managing users and client config
- **User token**: scoped to a specific user, for bank connections and payment operations
- Both expire in ~1 hour (3599 seconds)
