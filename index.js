$(document).ready(() => {
  getLocation().then((res) => {
    const API_KEY = 'eb80a8a1ae85966b86dd2e281d3df6e3';
    const url = 'https://api.openweathermap.org/data/2.5/weather';
    const { coords: { latitude, longitude } } = res;

    $.get(`${url}?units=imperial&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`).done((res) => {

      $('#thermometer').thermometer({
        minValue: -40,
        maxValue: 122,
        startValue: -40,
        topText: '122F',
        bottomText: '-40F',
        textColour: '#000000',
        tickColour: '#000000',
        animationSpeed: 2500,
        valueChanged: val => {
          $('#value-display').text(`${val.toFixed(1)}F`);
        },
        height: 500,
        width: 500,
        pathToSVG: 'lib/jquery.thermometer/svg/thermo-bottom.svg',
        liquidColour: value => {
          const red = ~~Math.abs((value) / 122 * 255);
          const blue = ~~Math.abs((122-value)/122 * 255);
          return RGB2HTML(red, 0, blue);
        },
        onLoad: () => {
          $('#thermometer').thermometer( 'setValue', -40);
          setTimeout(() => $('#thermometer').thermometer( 'setValue', res.main.temp ), 1500)
        }
      });
      $('.max-temp-val').text(`${res.main.temp_max.toFixed(1)}F`)
      $('.min-temp-val').text(`${res.main.temp_min.toFixed(1)}F`)
    });

    }
  );
});

const getLocation = () => (
  new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(res, rej);
  })
);

const RGB2HTML = (red, green, blue) => {
  const decColor = 0x1000000+blue + 0x100*green + 0x10000*red ;
  return '#'+decColor.toString(16).substr(1);
};