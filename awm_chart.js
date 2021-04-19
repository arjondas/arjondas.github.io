var Recharts = window.Recharts;

var toneMid = 'rgb(32,32,32)';
var toneLight = 'rgb(82,82,82)';
var toneLighter = 'rgb(200,200,200)';
var mainColor = 'seagreen';

var data = [{ 'noise': 0, 'loss': 0.27292850613594055, 'accuracy': 99.77678656578064 }, { 'noise': 3, 'loss': 0.7379573583602905, 'accuracy': 97.73351550102234 }, { 'noise': 6, 'loss': 1.784204125404358, 'accuracy': 94.34237480163574 }, { 'noise': 9, 'loss': 3.582695245742798, 'accuracy': 90.13564586639404 }, { 'noise': 12, 'loss': 5.758223533630371, 'accuracy': 85.7228696346283 }, { 'noise': 15, 'loss': 8.849291801452637, 'accuracy': 81.07829689979553 }, { 'noise': 18, 'loss': 12.555835723876953, 'accuracy': 76.18475556373596 }, { 'noise': 21, 'loss': 16.937700271606445, 'accuracy': 71.85782790184021 }, { 'noise': 24, 'loss': 22.450790405273438, 'accuracy': 67.73695349693298 }, { 'noise': 27, 'loss': 28.66543960571289, 'accuracy': 64.5776093006134 }, { 'noise': 30, 'loss': 35.6020622253418, 'accuracy': 61.28948926925659 }];

var CustomToolTip = function CustomToolTip(_ref) {
  var active = _ref.active,
      payload = _ref.payload,
      label = _ref.label;

  if (active) {
    var accuracy = 0;
    var id = '';
    if (payload && payload[0] && payload[0].payload) {
      accuracy = payload[0].payload.accuracy || 0;
      id = payload[0].payload.id || '';
    }
    return React.createElement(
      'div',
      { className: 'tooltip', style: { backgroundColor: toneMid, border: '0.5px solid ' + toneLighter } },
      React.createElement(
        'strong',
        { style: { color: { mainColor: mainColor }, fontSize: '14px' } },
        'Salt-n-Pepper Noise: ',
        label,
        '%\xA0\xA0-\xA0\xA0 Similarity Detection Accuracy: ',
        Number(accuracy).toFixed(2),
        '%'
      ),
      React.createElement('br', null),
      React.createElement('img', {
        className: 'tooltip-image',
        src: 'images/snp/snp_' + label + '.png'
      })
    );
  }
  return null;
};

var renderLegendText = function renderLegendText(value, entry) {
  var color = entry.color;

  return React.createElement(
    'span',
    {
      style: { color: color } },
    'Accuracy of Similarity Detection between original and noisy extracted audio'
  );
};

var AWM_CHART = function AWM_CHART(props) {
  return React.createElement(
    'div',
    { className: 'Chart-Container' },
    React.createElement(
      'div',
      { className: 'Chart-Label' },
      'Please ',
      React.createElement(
        'strong',
        { style: { color: 'orange' } },
        'hover mouse'
      ),
      ' on graph to see the AWM\'s audio extraction w.r.t. added noise'
    ),
    React.createElement(
      Recharts.ResponsiveContainer,
      { width: '100%', height: '100%' },
      React.createElement(
        Recharts.LineChart,
        {
          data: data,
          margin: {
            top: 0,
            right: 10,
            left: 0,
            bottom: 5
          }
        },
        React.createElement(Recharts.CartesianGrid, {
          strokeDasharray: '3 3',
          stroke: 'rgba(70, 70, 70, 1)'
        }),
        React.createElement(Recharts.XAxis, {
          dataKey: 'noise',
          label: {
            value: 'Salt-n-Pepper Noise added per Test Evaluation (%)',
            fill: 'white',
            position: 'insideBottom',
            offset: 1,
            fontSize: 10
          }
        }),
        React.createElement(Recharts.YAxis, {
          type: 'number',
          domain: ['auto', 'auto'],
          label: {
            value: 'Accuracy of Similarity Detection (%)',
            fill: 'white',
            offset: 1,
            angle: -90,
            fontSize: 10
          }
        }),
        React.createElement(Recharts.Tooltip, {
          cursor: {
            fill: toneMid,
            stroke: toneLighter,
            strokeWidth: 0.5
          },
          contentStyle: {
            backgroundColor: toneMid,
            border: '0.5px solid ' + toneLighter,
            textTransform: 'capitalize',
            borderRadius: '5px',
            zIndex: 999
          },
          isAnimationActive: false,
          content: React.createElement(CustomToolTip, null)
        }),
        React.createElement(Recharts.Legend, {
          align: 'right',
          verticalAlign: 'top',
          wrapperStyle: {
            top: 20
          },
          formatter: renderLegendText
        }),
        React.createElement(Recharts.Line, { type: 'monotone', dataKey: 'accuracy', stroke: 'orange', activeDot: { r: 8 } })
      )
    )
  );
};

var domContainer = document.querySelector('#awm_chart_container');
ReactDOM.render(React.createElement(AWM_CHART, null), domContainer);