jquery-richselect
=================

Image/HTML support in select options and opgroups

### Quick usage

```javascript
$(function(){
		$('#mySelect').richselect();
});
```

### Markup

```html
<select id="mySelect">
	<option selected="selected" value="-1">Select your option</option>
	<optgroup data-icon="imgs/administrator.png" label="category 1">
		<option>One</option>
		<option value="myVal2">Two</option>
		<option>Three</option>
	</optgroup>
	<optgroup data-icon="imgs/angel.png" label="category 2">
		<option>Four</option>
		<option>Five</option>
	</optgroup>
	<option>Six</option>
</select>
```

### Demo

[http://lmarcon.github.io/jquery-richselect/](http://lmarcon.github.io/jquery-richselect/)

Tested on: Chrome, Firefox, IE8+
