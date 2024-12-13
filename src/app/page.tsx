"use client";
import Container from "@/components/Container";
import { NavBar } from "../components/NavBar";
import { format, fromUnixTime, parseISO } from "date-fns";
import { convertKelvinToCelsius } from "@/utils/converKelvinToCelsius";
import { WeatherIcon } from "@/components/WeatherIcon";
import { getDayOrNightIcon } from "@/utils/getDayOrNightIcon";
import { WeatherDetails } from "@/components/WeatherDetails";
import { metersToKilometers } from "@/utils/metersToKilometers";
import { convertWindSpeed } from "@/utils/convertWindSpeed";
import ForecastWetherDetail from "@/components/ForecastWetherDetail";
import { useEffect } from "react";

import { fetchWeatherData } from "@/utils/weatherService";
import { useQuery } from "react-query";
import { WeatherResponse } from "@/types/types";
import { useAtom } from "jotai";
import { loadingCityAtom, placeAtom } from "@/stores/atom";
import { WeatherSkeleton } from "@/components/Sceleton";
const Home = () => {
  const [place] = useAtom(placeAtom);
  const [loadingCity] = useAtom(loadingCityAtom);
  const { isLoading, data, refetch } = useQuery<WeatherResponse>(
    "repoData",
    () => fetchWeatherData(place)
  );

  useEffect(() => {
    refetch();
  }, [place, refetch]);

  if (isLoading) {
    return (
      <div className="flex items-center min-h-screen justify-center">
        <p className="animate-bounce">Loading...</p>
      </div>
    );
  }

  const firstDate = data?.list[0];

  const uniqueDates = [
    ...new Set(
      data?.list.map(
        (entry) => new Date(entry.dt * 1000).toISOString().split("T")[0]
      )
    ),
  ];

  const firstDateforEachDate = uniqueDates.map((date) => {
    return data?.list.find((entry) => {
      const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
      const entryTime = new Date(entry.dt * 1000).getHours();
      return entryDate === date && entryTime >= 6;
    });
  });

  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <NavBar location={data?.city.name} />
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        {loadingCity ? (
          <WeatherSkeleton />
        ) : (
          <>
            <section className="space-y-4">
              <div className="space-y-2">
                <h2 className="flex gap-1 text-2xl items-end">
                  <p>{format(parseISO(firstDate?.dt_txt ?? ""), "EEEE")}</p>
                  <p>
                    ({format(parseISO(firstDate?.dt_txt ?? ""), "dd.MM.yyyy")})
                  </p>
                </h2>
                <Container className="gap-10 px-6 items-center">
                  {/* temprature */}
                  <div className="flex flex-col px-4 items-center gap-2">
                    <span className="text-5xl">
                      {convertKelvinToCelsius(firstDate?.main.temp ?? 296.39)}°
                    </span>
                    <p className="text-xs space-x-1 whitespace-nowrap">
                      <span>Feels like</span>
                      <span>
                        {convertKelvinToCelsius(
                          firstDate?.main.feels_like ?? 2000
                        )}
                        °
                      </span>
                    </p>
                    <p className="text-xs space-x-2">
                      <span>
                        {convertKelvinToCelsius(firstDate?.main.temp_min ?? 0)}
                        °↓{" "}
                      </span>
                      <span>
                        {" "}
                        {convertKelvinToCelsius(firstDate?.main.temp_max ?? 0)}
                        °↑
                      </span>
                    </p>
                  </div>
                  {/* time and weather icon */}
                  <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
                    {data?.list.map((d, i) => (
                      <div
                        key={i}
                        className="flex flex-col justify-between gap-2 items-center text-xs font-semibold"
                      >
                        <p className="whitespace-nowrap">
                          {format(parseISO(d.dt_txt), "h:mm a")}
                        </p>
                        <WeatherIcon
                          iconName={getDayOrNightIcon(
                            d.weather[0].icon,
                            d.dt_txt
                          )}
                        />
                        <p>{convertKelvinToCelsius(d?.main.temp ?? 0)}°</p>
                      </div>
                    ))}
                  </div>
                </Container>
              </div>
              <div className="flex gap-4">
                <Container className="w-fit justify-center flex-col px-4 items-center">
                  <p className="capitalize text-center">
                    {firstDate?.weather[0].description}
                  </p>
                  <WeatherIcon
                    iconName={getDayOrNightIcon(
                      firstDate?.weather[0].icon ?? "",
                      firstDate?.dt_txt ?? ""
                    )}
                  />
                </Container>
                <Container className="bg-yellow-300/80 px-6 gap-4 justify-between overflow-x-auto">
                  <WeatherDetails
                    visiability={metersToKilometers(
                      firstDate?.visibility ?? 10000
                    )}
                    airPressure={`${firstDate?.main.pressure} hPa`}
                    humidity={`${firstDate?.main.humidity}%`}
                    sunrise={format(
                      fromUnixTime(data?.city.sunrise ?? 1733809661),
                      "H:mm"
                    )}
                    windSpeed={convertWindSpeed(firstDate?.wind.speed ?? 1.6)}
                    sunset={format(
                      fromUnixTime(data?.city.sunset ?? 1733838855),
                      "H:mm"
                    )}
                  />
                </Container>
              </div>
            </section>
            <section className="space-y-4">
              <p className="text-2xl">Forcast (7 days)</p>
              {firstDateforEachDate.map((d, i) => (
                <ForecastWetherDetail
                  key={i}
                  description={d?.weather[0].description ?? ""}
                  weatehrIcon={d?.weather[0].icon ?? ""}
                  date={format(parseISO(d?.dt_txt ?? ""), "dd.MM")}
                  day={format(parseISO(d?.dt_txt ?? ""), "EEEE")}
                  feels_like={d?.main.feels_like ?? 0}
                  temp={d?.main.temp ?? 0}
                  temp_min={d?.main.temp_min ?? 0}
                  temp_max={d?.main.temp_max ?? 0}
                  airPressure={`${d?.main.pressure} hPa`}
                  humidity={`${d?.main.humidity}`}
                  sunrise={format(
                    fromUnixTime(data?.city.sunrise ?? 1702517657),
                    "H:mm"
                  )}
                  sunset={format(
                    fromUnixTime(data?.city.sunset ?? 1702517657),
                    "H:mm"
                  )}
                  visiability={`${metersToKilometers(d?.visibility ?? 10000)}`}
                  windSpeed={`${convertWindSpeed(d?.wind.speed ?? 1.64)}`}
                />
              ))}
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
