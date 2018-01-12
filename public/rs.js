		var Things = React.createClass({
			getInitialState: function(){
			return({
			things: []
			});
			},
			render: function(){
			var things = this.state.things;
			things = things.map(function(thing, index){
				return(
				<li key ={index}>
					<span className={thing.obj.working}></span>
					<span className="name">{thing.obj.name}</span>
					<span className="number">{thing.obj.number}</span>
					<span className="dist">{Math.floor(thing.dis/1000)} km</span>
				</li>
				);
			});
			return(
			<div id= "thing-container">
				<form id= "search" onSubmit={this.handleSubmit}>
					<label>Input latitude:</label>
					<input type="text" ref= "lat" placeholder= "latitude" required/>
					<label>Input longitude:</label>
					<input type="text" ref= "lng" placeholder= "longitude" required/>
					<input type="submit" value= "Find people"/>
				</form>
				<ul>{things}</ul>
			</div>
			);
		},
			handleSubmit: function(e){
				e.preventDefault();
				var lng = this.refs.lng.value;
				var lat = this.refs.lat.value;
				
				fetch('/api/things?lng=' + lng + '&lat=' + lat).then(function(data){
					return data.json();
				}).then( json => {
				this.setState({
					things: json
				});
				console.log(json);
			});
		}
	});
		
	ReactDOM.render(<Things/>, document.getElementById('things'));