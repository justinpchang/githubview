// Takes raw path name and returns promise of repo string
const getRepoString = (locPath) => {
  console.log('locPath: ' + locPath);
  return fetch('http://localhost:3001' + locPath)
    .then((res) => res.text())
    .catch((err) => err); // Need error handling
}

export {
  getRepoString
};