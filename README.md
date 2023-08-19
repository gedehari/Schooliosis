# Schooliosis

A school management system for use in schools adhering to the Indonesian school system. Still in development.

## Getting started

1. Setup a MySQL database.
2. Setup environment variables. Either create a .env or export the variables directly.

```bash
# The MySQL Database URL. Format:
# mysql://<user>:<password>@<host>/schooliosis
DATABASE_URL

# Cookie secret, fill it with random values
COOKIE_SECRET
```

3. Setup packages.

```bash
npm i
```

4. Do database migration.

```bash
npx prisma migrate deploy
```

5. Run the app.

```bash
npm run dev
```

## License

This repository is licensed under The Unlicense. Refer to the [LICENSE.md](LICENSE.md) for more information.
