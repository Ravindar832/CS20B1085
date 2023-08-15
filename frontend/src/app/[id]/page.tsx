const getTrain = async (id: string) => {
  const response = await fetch(`http://localhost:3001/trains/${id}`);
  const { result } = await response.json();
  return result;
};

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const train = await getTrain(id);
  return (
    <main className="absolute flex items-center justify-center w-full h-full p-10">
      <div className=" p-6 border rounded-lg shadow bg-gray-800 border-gray-700 hover:bg-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
          {train.trainName}
        </h5>
        <p>Number: {train.trainNumber}</p>
        <p>
          Departure Time:{" "}
          {`${train.departureTime.Hours}:${train.departureTime.Minutes}:${train.departureTime.Seconds}`}
        </p>
        <p>
          Seats Available:{" "}
          {`Sleeper: ${train.seatsAvailable.sleeper}, AC: ${train.seatsAvailable.AC}`}
        </p>
        <p>Price: {`Sleeper: ${train.price.sleeper}, AC: ${train.price.AC}`}</p>
        <p>Delayed By: {train.delayedBy}</p>
      </div>
    </main>
  );
}
