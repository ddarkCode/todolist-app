exports.getDate = function () {
	let toDay = new Date();

  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  return toDay.toLocaleString( 'en-US', options );

};

exports.getDay = function () {
	let toDay = new Date();

  const options = { weekday: 'long' };
  return toDay.toLocaleString( 'en-US', options );
  

}