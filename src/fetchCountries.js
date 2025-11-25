// * Appeal to a server to find a country

export default function fetchCountries(searchQuery) {
  return fetch(`https://restcountries.com/v3.1/name/${searchQuery}`).then(
    (res) => res.json()
  );
}
