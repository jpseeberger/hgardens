{% extends 'inventory_layout.swig' %}

{% block content %}

<h2 class="ui teal dividing header center aligned">Delete Item</h2>

<div class="ui center aligned grid container">
  <div class="column six wide">
    <form class="ui form" method="post" action="/inventory/{{item.id}}/delete"  id="deleteItem">
      <label class="ui">Are you sure you want to delete {{item.name}}?</label>
      <button class="ui small button" type="submit">Submit</button>
    </form>
  </div>
<div>

{% endblock %}
