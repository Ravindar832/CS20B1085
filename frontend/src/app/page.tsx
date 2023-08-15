import Image from "next/image";

const getTrains = async () => {
  const response = await fetch("http://localhost:3001/trains");
  const { result } = await response.json();
  return result;
};

export default async function Home() {
  const trains = await getTrains();
  return (
    <main className="p-10">
      <h1 className="text-center mb-5">
        Train Central By Ravindar Guguloth (CS20B1085)
      </h1>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-xs uppercase bg-gray-700 text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Train Name
              </th>
              <th scope="col" className="px-6 py-3">
                Train Number
              </th>
              <th scope="col" className="px-6 py-3">
                Departure Time
              </th>
              <th scope="col" className="px-6 py-3">
                Seats Available
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Delayed By
              </th>
              <th scope="col" className="px-6 py-3">
                More
              </th>
            </tr>
          </thead>
          <tbody>
            {trains.map((train, index) => {
              return (
                <tr className="bg-gray-800" key={index}>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap text-white"
                  >
                    {train.trainName}
                  </th>
                  <td className="px-6 py-4">{train.trainNumber}</td>
                  <td className="px-6 py-4">{`${train.departureTime.Hours}:${train.departureTime.Minutes}:${train.departureTime.Seconds}`}</td>
                  <td className="px-6 py-4">{`Sleeper: ${train.seatsAvailable.sleeper}, AC: ${train.seatsAvailable.AC}`}</td>
                  <td className="px-6 py-4">{`Sleeper: ${train.price.sleeper}, AC: ${train.price.AC}`}</td>
                  <td className="px-6 py-4">{train.delayedBy}</td>
                  <th scope="col" className="px-6 py-3">
                    <a
                      href={`/${train.trainNumber}`}
                      className="p-1 bg-blue-500 rounded-md font-normal text-white"
                    >
                      View
                    </a>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
