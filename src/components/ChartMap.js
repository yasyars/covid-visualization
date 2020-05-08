import React from 'react';
import ReactDOM from 'react-dom';
import { Chart } from "react-google-charts";

// import data from '../data/data.json';

const chartEvents = [
	{
		eventName: "select",
		callback({ chartWrapper }) {
			// console.log("Selected ", chartWrapper.getChart().getSelection());
			var selection = chartWrapper.getChart().getSelection();
			var message = '' , str = '';
			var dataTable = chartWrapper.getDataTable()

			for (var i = 0; i < selection.length; i++) {
				var item = selection[i];
				if (item.row != null && item.column != null) {
					message += '{row:' + item.row + ',column:' + item.column + '}';
					str = dataTable.getFormattedValue(item.row, item.column);
				} else if (item.row != null) {
					message += '{row:' + item.row + '}';
					str = dataTable.getFormattedValue(item.row, 0);
				} else if (item.column != null) {
					message += '{column:' + item.column + '}';
					str = dataTable.getFormattedValue(0, item.column);
				}

			}
			if (message === '') {
				message = 'nothing';
			}
			console.log('You selected ' + message + "\n" + str);
		}
	}
];

const options = {
	region: 'ID',
	resolution: 'provinces',
	displayMode: 'regions'
};

const dataTable = [
	['Province', 'Total Case'],
	['ID-AC', 200],
	['ID-BA', 300],
	['ID-BB', 400],
	['ID-BT', 500],
	['ID-BE', 600],
	['ID-GO', 700],
]

class ChartMap extends React.Component {
	constructor(props){
		super(props)
	}

	render() {
		

		return(
			<Chart
				width={'1000px'}
				height={'600px'}
				chartType="GeoChart"
				data={ dataTable }
				options={options}
				// Note: you will need to get a mapsApiKey for your project.
				// See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
				mapsApiKey="AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY"
				rootProps={{ 'data-testid': '1' }}
				chartEvents={chartEvents}
		    />
		)
	}
}

export default ChartMap;