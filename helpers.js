module.exports.echo = function echo(input) {
    process.stdout.write(input);
}


//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//:::                                                                         :::
//:::  This routine calculates the distance between two points (given the     :::
//:::  latitude/longitude of those points). It is being used to calculate     :::
//:::  the distance between two locations using GeoDataSource (TM) prodducts  :::
//:::                                                                         :::
//:::  Definitions:                                                           :::
//:::    South latitudes are negative, east longitudes are positive           :::
//:::                                                                         :::
//:::  Passed to function:                                                    :::
//:::    lat1, lon1 = Latitude and Longitude of point 1 (in decimal degrees)  :::
//:::    lat2, lon2 = Latitude and Longitude of point 2 (in decimal degrees)  :::
//:::    unit = the unit you desire for results                               :::
//:::           where: 'M' is statute miles (default)                         :::
//:::                  'K' is kilometers                                      :::
//:::                  'N' is nautical miles                                  :::
//:::                                                                         :::
//:::  Worldwide cities and other features databases with latitude longitude  :::
//:::  are available at https://www.geodatasource.com                         :::
//:::                                                                         :::
//:::  For enquiries, please contact sales@geodatasource.com                  :::
//:::                                                                         :::
//:::  Official Web site: https://www.geodatasource.com                       :::
//:::                                                                         :::
//:::               GeoDataSource.com (C) All Rights Reserved 2022            :::
//:::                                                                         :::
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
module.exports.distance = function distance(lat1, lon1, lat2, lon2, unit){
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}    
}


module.exports.utcDate = function utcDate(date) {
	const timestamp = Date.UTC(
	  date.getFullYear(),
	  date.getMonth(),
	  date.getDate(),
	  date.getHours(),
	  date.getMinutes(),
	  date.getSeconds(),
	  date.getMilliseconds(),
	);
  
	return new Date(timestamp);
}
  

module.exports.getDateFromStringTime = function getDateFromStringTime(date, hour, min, second) {
	const timestamp = Date.UTC(
	  date.getFullYear(),
	  date.getMonth(),
	  date.getDate(),
	  hour,
	  min,
	  second,
	  date.getMilliseconds(),
	);
  
	return new Date(timestamp);
}
  



module.exports.getTranDateId = function getTranDateId(dateObj) {
    //var dateObj = new Date();
	/*
    var month = ("0" + dateObj.getUTCMonth() + 1 ).slice(-2); //months from 1-12
    var day = ("0" + dateObj.getUTCDate() ).slice(-2); 
    var year = dateObj.getUTCFullYear();

    newdate = year + "" + month + "" + day;
	return newdate; 
	*/

	const year = dateObj.getUTCFullYear();
	const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
	const day = String(dateObj.getUTCDate()).padStart(2, '0');
	const joined = [ year, month, day ].join('');
	return joined; 
}
module.exports.getTranId = function getTranId(dateObj, userId) {

	const year = dateObj.getUTCFullYear();
	const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
	const day = String(dateObj.getUTCDate()).padStart(2, '0');
	const joined = [ year, month, day, userId ].join('');
	return joined; 
}


module.exports.getTranDateIdFromDate = function utcDate(date) {
	/*
	const timestamp = Date.UTC(
	  date.getFullYear(),
	  date.getMonth(),
	  date.getDate(),
	  date.getHours(),
	  date.getMinutes(),
	  date.getSeconds(),
	  date.getMilliseconds(),
	);
	*/
  
	return new Date(timestamp);
}
  
  
