var classContent = {
	_meta: {
		////-----------------------------------------------------------------------------------------
		// Just some debugging info
		type: 'view'
	},
	////-----------------------------------------------------------------------------------------
	// array of eventdefinitions
	events: [],
	////-----------------------------------------------------------------------------------------
	// Gets triggered before template gets rendered
	construct: function(){},
	_checkForEvent: function() {
		var result =  {found: false, result: null};
		return result;
	},
	////-----------------------------------------------------------------------------------------
	// handles replacement of content and triggers compile function
	_render: function(){
		this._meta.dirty = false;
		// @TODO remove subcontrollers
		while( this.obj( 'root' ).length > 1 ){
			this.obj( 'root' ).last().remove(); // I want only one object to get replaced, else its possible to have the content dubled
		}
		this.obj( 'root' ).replaceWith( this._compile() );
		// @TODO safecall on controller.notify()
	},
	////-----------------------------------------------------------------------------------------
	// Trigger jade compiler
	_compile: function(){
		return vood.viewHelper.compile( this.controller._meta.path, this.controller.content );
	},
	////-----------------------------------------------------------------------------------------
	// Triggers compilefunction but adds script-tags with uid
	_compileComplete: function(){
		var id = this.controller._meta.uid;
		return vood.viewHelper.scriptStart( id ) + this._compile() + vood.viewHelper.scriptEnd( id );
	},
	////-----------------------------------------------------------------------------------------
	// returns jquery object depending selector
	obj: function( path ){
		var selector = null;
		var id = this.controller._meta.uid;
		if( path !== 'root' ){
			if( !this[ path ] ){
				throw 'Couldnt get you the obj because of missing definition';
			}
			selector = this[ path ];
		}
		return $( 'script[' + vood.viewHelper.uidAttrStart + '=' + id + ']' ).nextUntil( 'script[' + vood.viewHelper.uidAttrEnd + '=' + id +']', selector );
	}
};

////-----------------------------------------------------------------------------------------
// Function for creating classes
function view( path, obj ){
	if( vood.viewHelper.list[ path ] ){
		console.warn( 'The View for ' + path + ' already exists' );
	} else {
		vood.viewHelper.list[ path ] = vood.Obj( 'view', path, obj );
		vood.utilHelper.merge( vood.viewHelper.list[ path ], classContent );
	}
}

export default view;