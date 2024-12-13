export function metersToKilometers(visibityInMeters: number): string {
  const visibityInKilometers = visibityInMeters / 1000
  return `${visibityInKilometers.toFixed(0)}km`
}