{% extends 'inventory.swig' %}

{% block content %}
<form class="ui form" method="post" action="/inventory"  id="editItemForm">
  <div class="field">
    <div class="fields">
      <div class="two wide field">
        <input type="text" name="classifcation" value={{arrayItem[0].classification}}>
      </div>
      <div class="two wide field">
        <input type="text" name="category" value={{arrayItem[0].category}}>
      </div>
      <div class="three wide field">
        <input type="text" name="subcategory" value={{arrayItem[0].subcategory}}>
      </div>
      <div class="two wide field">
        <input type="text" name="price" value={{arrayItem[0].price}}>
      </div>
      <div class="two wide field">
        <input type="text" name="unit" value={{arrayItem[0].unit}}>
      </div>
      <div class="two wide field">
        <input type="text" name="unitsavailable" value={{arrayItem[0].unitsavailable}}>
      </div>
      <div class="two wide field">
        <input type="text" name="grower" value={{arrayItem[0].grower}}>
      </div>
      <div class="one wide field">
        <input type="text" name="photo" value={{arrayItem[0].photo}}>
      </div>
    </div>
  </div>
  <button type="submit" class="ui small button">Submit</button>
</form>


{% endblock %}