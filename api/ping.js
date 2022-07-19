import routes from "../constants/routes";
import client from "./client";

export async function pingTest() {
  const url = routes.ping.url;
  try {
    const response = await client.get(url).then((res) => res.data);
    return response;
  } catch (error) {
    console.error(error);
    setTimeout(() => {
      pingTest();
    }, 3000);
  }
}
