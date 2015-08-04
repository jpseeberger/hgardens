{% extends 'inventory.swig' %}

{% block content %}
<form class="ui form" method="post" action="/inventory">
  <div class="field">
    <div class="fields">
      <div class="two wide field">
        <input type="text" name="classifcation" value={{arr[5].classification}}>
      </div>
      <div class="two wide field">
        <input type="text" name="category" value={{arr[5].category}}>
      </div>
      <div class="three wide field">
        <input type="text" name="subcategory" value={{arr[5].subcategory}}>
      </div>
      <div class="two wide field">
        <input type="text" name="price" value={{arr[5].price}}>
      </div>
      <div class="two wide field">
        <input type="text" name="unit" value={{arr[5].unit}}>
      </div>
      <div class="two wide field">
        <input type="text" name="unitsavailable" value={{arr[5].unitsavailable}}>
      </div>
      <div class="two wide field">
        <input type="text" name="grower" value={{arr[5].grower}}>
      </div>
      <div class="one wide field">
        <input type="text" name="photo" value={{arr[5].photo}}>
      </div>
    </div>
  </div>
  <button type="submit" class="ui small button">Submit</button>
</form>


{% endblock %}