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
    console.log('images/cutout_' + label + '.png');
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

var AIWM_CHART = function AIWM_CHART(props) {
  return React.createElement(
    'div',
    { className: 'Chart-Container' },
    React.createElement(
      'div',
      { className: 'Chart-Label' },
      'Salt-n-Pepper Noisy Marked Extraction vs AWM Siamese Network\'s Similarity Detection Accuracy'
    ),
    React.createElement(
      Recharts.ResponsiveContainer,
      { width: '100%', height: '100%' },
      React.createElement(
        Recharts.LineChart,
        {
          width: 500,
          height: 300,
          data: data,
          margin: {
            top: 5,
            right: 10,
            left: 0,
            bottom: 5
          }
        },
        React.createElement(Recharts.CartesianGrid, {
          strokeDasharray: '3 3',
          stroke: 'rgba(70, 70, 70, 1)'
        }),
        React.createElement(
          Recharts.XAxis,
          { dataKey: 'noise' },
          React.createElement(Recharts.Label, { value: 'Noise Percentage', offset: 0, position: 'insideBottom' })
        ),
        React.createElement(Recharts.YAxis, {
          type: 'number',
          domain: ['auto', 'auto']
        }),
        React.createElement(Recharts.Tooltip, {
          // offset={15}
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
        React.createElement(Recharts.Line, { type: 'monotone', dataKey: 'accuracy', stroke: 'orange', activeDot: { r: 0 } })
      )
    )
  );
};

var domContainer = document.querySelector('#aiwm_chart_container');
ReactDOM.render(React.createElement(AIWM_CHART, null), domContainer);