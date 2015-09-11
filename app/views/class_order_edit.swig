{% extends 'inventory_layout.swig' %}

{% block content %}

<h2 class="ui teal dividing header center aligned"><br/>Edit Top Level Classification Order</h2>

<div class="ui middle aligned center aligned grid">

  <form class="ui form" method="post" action="/class_order/{{class_order[0].id}}"  id="setTopLevelOrder">
    <div class="fields">
      <div class="six wide field">
        <label>Classification</label>
        <select name="classification_id">
          <option value="{{class_order[0].id}}">
            {{class_order[0].name}}
          </option>
        </select>
      </div>
      <div class="ten wide field">
        <label>Order to Appear on Home Page</label>
        <select name="level_order">
          {% for lev in levels %}
            <option value="{{lev}}">
              {{lev}}
            </option>
          {% endfor %}
        </select>
    </div>
    <button type="submit" class="ui small button">Submit</button>
  </form>
</div>

{% endblock %}