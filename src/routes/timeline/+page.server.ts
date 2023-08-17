import type { PageServerLoad, RouteParams } from "./$types";
async function demo(params: RouteParams): Promise<string> {
  console.log(params);
  return Promise.resolve(`timeline`);
}

export const load = (async ({ params }) => {
  return {
    subject: await demo(params),
  };
}) satisfies PageServerLoad;
