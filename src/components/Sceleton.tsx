import React from 'react';
import Container from './Container'; // Adjust the import as needed

export function WeatherSkeleton() {
  return (
    <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4 animate-pulse">
      <section className="space-y-4">
        <div className="space-y-2">
          <h2 className="flex gap-1 text-2xl items-end">
            <p className="bg-gray-300 h-6 w-20 rounded"></p>
            <p className="bg-gray-300 h-6 w-24 rounded"></p>
          </h2>
          <Container className="gap-10 px-6 items-center">
            <div className="flex flex-col px-4 items-center gap-2">
              <span className="bg-gray-300 h-12 w-12 rounded"></span>
              <p className="text-xs space-x-1 whitespace-nowrap">
                <span className="bg-gray-300 h-4 w-24 rounded"></span>
              </p>
              <p className="text-xs space-x-2">
                <span className="bg-gray-300 h-4 w-10 rounded"></span>
                <span className="bg-gray-300 h-4 w-10 rounded"></span>
              </p>
            </div>
            <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex flex-col justify-between gap-2 items-center text-xs font-semibold">
                  <p className="bg-gray-300 h-4 w-12 rounded"></p>
                  <WeatherIconSkeleton />
                  <p className="bg-gray-300 h-4 w-8 rounded"></p>
                </div>
              ))}
            </div>
          </Container>
        </div>
        <div className="flex gap-4">
          <Container className="w-fit justify-center flex-col px-4 items-center">
            <p className="bg-gray-300 h-4 w-32 rounded"></p>
            <WeatherIconSkeleton />
          </Container>
          <Container className="bg-yellow-300/80 px-6 gap-4 justify-between">
            <WeatherDetailsSkeleton />
          </Container>
        </div>
      </section>
      <section className="flex w-full flex-col gap-4">
        <p className="bg-gray-300 h-6 w-36 rounded"></p>
        {[...Array(7)].map((_, i) => (
          <ForecastWeatherDetailSkeleton key={i} />
        ))}
      </section>
    </main>
  );
}

// Additional skeleton components
function WeatherIconSkeleton() {
  return (
    <div className="relative h-20 w-20 bg-gray-300 rounded"></div>
  );
}

function WeatherDetailsSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <p className="bg-gray-300 h-4 w-32 rounded"></p>
      <p className="bg-gray-300 h-4 w-32 rounded"></p>
      <p className="bg-gray-300 h-4 w-32 rounded"></p>
      <p className="bg-gray-300 h-4 w-32 rounded"></p>
      <p className="bg-gray-300 h-4 w-32 rounded"></p>
    </div>
  );
}

function ForecastWeatherDetailSkeleton() {
  return (
    <div className="flex justify-between p-4 bg-gray-100 rounded">
      <div className="flex flex-col space-y-2">
        <p className="bg-gray-300 h-4 w-24 rounded"></p>
        <p className="bg-gray-300 h-4 w-24 rounded"></p>
      </div>
      <div className="flex flex-col space-y-2 items-end">
        <p className="bg-gray-300 h-4 w-8 rounded"></p>
        <p className="bg-gray-300 h-4 w-8 rounded"></p>
        <p className="bg-gray-300 h-4 w-8 rounded"></p>
      </div>
    </div>
  );
}
