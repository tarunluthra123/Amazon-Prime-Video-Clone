const routes = {
  ping: {
      url: "/ping",
      method: "GET",
  },
  auth: {
      details: {
          url: "/user/",
          method: "GET",
      },
      login: {
          url: "/auth/",
          method: "POST",
      },
      signup: {
          url: "/auth/create",
          method: "POST",
      },
      refresh: {
          url: "/auth/refresh",
          method: "POST",
      },
  },
  watchlist: {
      fetch: {
          url: "/watchlist",
          method: "GET",
      },
      add: {
          url: "/watchlist",
          method: "POST",
      },
      remove: {
          url: "/watchlist",
          method: "PATCH",
      },
  },
  favourites: {
      fetch: {
          url: "/favourites",
          method: "GET",
      },
      add: {
          url: "/favourites",
          method: "POST",
      },
      remove: {
          url: "/favourites",
          method: "PATCH",
      },
  },
};

export default routes;
