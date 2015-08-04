{% extends 'inventory.swig' %}

{% block content %}
<form class="ui form" method="post" action="/inventory">
  <div class="field">
    <div class="fields">
      <div class="two wide field">
        <input type="text" name="classifcation" placeholder="class">
      </div>
      <div class="two wide field">
        <input type="text" name="category" placeholder="category">
      </div>
      <div class="three wide field">
        <input type="text" name="subcategory" placeholder="subcategory">
      </div>
      <div class="two wide field">
        <input type="text" name="price" placeholder="price">
      </div>
      <div class="two wide field">
        <input type="text" name="unit" placeholder="unit">
      </div>
      <div class="two wide field">
        <input type="text" name="unitsavailabe" placeholder="# available">
      </div>
      <div class="two wide field">
        <input type="text" name="grower" placeholder="grower">
      </div>
      <div class="one wide field">
        <input type="text" name="photo" placeholder="photo">
      </div>
    </div>
  </div>
  <button type="submit" class="ui small button">Submit</button>
</form>


{% endblock %}