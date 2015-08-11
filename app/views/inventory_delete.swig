{% extends 'inventory.swig' %}

{% block content %}
<form class="ui form" method="post" action="/inventory"  id="editItemForm">
  <div>
    Are you sure you want to delete {{currentItem[0].category}}, {{currentItem[0].subcategory}}?


  </div>
  <button type="submit" class="ui small button">Submit</button>
</form>

{% endblock %}