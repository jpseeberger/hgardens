{% extends 'inventory.swig' %}

{% block content %}
<form class="ui form" method="post" action="/inventory"  id="editItemForm">
  <div class="field">
    <div class="fields">
      <div class="two wide field">
        <input type="text" name="classifcation" value={{currentItem[0].classification}}>
      </div>
      <div class="two wide field">
        <input type="text" name="category" value={{currentItem[0].category}}>
      </div>
      <div class="three wide field">
        <input type="text" name="subcategory" value={{currentItem[0].subcategory}}>
      </div>
      <div class="two wide field">
        <input type="text" name="price" value={{currentItem[0].price}}>
      </div>
      <div class="two wide field">
        <input type="text" name="unit" value={{currentItem[0].unit}}>
      </div>
      <div class="two wide field">
        <input type="text" name="unitsavailable" value={{currentItem[0].unitsavailable}}>
      </div>
      <div class="two wide field">
        <input type="text" name="grower" value={{currentItem[0].grower}}>
      </div>
      <div class="one wide field">
        <input type="text" name="photo" value={{currentItem[0].photo}}>
      </div>
    </div>
  </div>
  <button type="submit" class="ui small button">Submit</button>
</form>


{% endblock %}