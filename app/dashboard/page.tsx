import { fetchAllStops } from "../lib/actions";
import CardWrapper from "../ui/dashboard/cards/card-wrapper";
import { AllStops } from "../ui/dashboard/stops";
import { lusitana } from "../ui/fonts";

export default async function Page() {
  const stopsData = await fetchAllStops();

  const updatedStops = stopsData.map(({ shortName, ...rest }) => ({
    id: shortName,
    ...rest,
  }));

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      {/* <div className="flex flex-col justify-center justify-items-center items-center"> */}
      <div className="flex flex-col gap-y-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* left in for now as a comment, will be possibly taken into use later */}
          {/* <Suspense fallback={<CardsSkeleton />}>
        <CardWrapper />
      </Suspense> */}
          <CardWrapper />
        </div>

        {/* <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8"> */}
        <div className="flex justify-center items-center flex-col place-self-center w-full">
          <AllStops stopsData={updatedStops} />
        </div>
      </div>
      {/* </div> */}
    </main>
  );
}
