# Hulu Clone

Hulu Clone made using [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/).
The build allows **Server Side Rendering** and is fully responsive. The data is fetched dynamically from [TMDB](https://www.themoviedb.org/) API.

The project can be viewed here - [Click Here](https://hulu-clone-amber.vercel.app/)

![](hulu-clone-screenshot.png)

### To run locally

1. Clone the project into your local repository and install the packages

```sh
yarn
# or
npm install
```

2. Create a local .env file in the root directory of the project and store your API_KEY for [TMDB](https://developers.themoviedb.org/3) inside it.

```sh
# .env
API_KEY=abcd123
```

3. Run the Next.js local development server

```sh
yarn start
# or
npm run start
```
