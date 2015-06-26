vood.helper = vood.Obj({});
////-----------------------------------------------------------------------------------------
// creating helper class
function helper( path, obj ){
	if( !app.helper ) app.helper = {};
	if(app.helper[path]) {
		console.warn( 'The helper for ' + path + ' already exists' );
	} else {
		app.helper[path] = vood.Obj( 'helper', path, obj );
	}
}

export default helper;