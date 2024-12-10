import { Handlers, PageProps } from "$fresh/server.ts";

const NAMES = ["Alice", "Bob", "Charlie", "Dave", "Eve", "Frank"];

interface Data {
  results: string[];
  query: string;
}

export const handler: Handlers<Data> = {
  GET(req, ctx) {
    const url = new URL(req.url);
    const query = url.searchParams.get("q") || "";
    const results = NAMES.filter((name) => name.includes(query));
    return ctx.render({ results, query });
  },
};

export default function Page({ data }: PageProps<Data>) {
  const { results, query } = data;
  return (
    <div class={""}>
      <form>
        <input type="text" name="q" value={query} />
        <button className="border-gray-500 p-2" type="submit">Search</button>
      </form>
      <ul>
        <h2 className={"text-bold text-xl"}>Search Results</h2>
        {results.map((name) => <li key={name}>・{name}</li>)}
      </ul>
    </div>
  );
}
