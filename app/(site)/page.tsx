import Search from "@/components/Search";
import { getProductFromDb } from "@/lib/product";
import Menu from "./menu";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";


export default async function Home({ searchParams }: any) {
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;
  const id =
    searchParams.id === "number" ? searchParams.id : Number(searchParams.id);

  const product = await getProductFromDb(search);

  return (
    <section className="bg-white">
      <div className="container mx-auto max-w-4xl ">
        <Search numberTable={id} search={search} />
        <Suspense fallback={<Skeleton />}>
          <Menu product={product} id={id} />
        </Suspense>
      </div>
    </section>
  );
}
