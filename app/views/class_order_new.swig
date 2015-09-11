{% extends 'inventory_layout.swig' %}

{% block content %}

<h2 class="ui teal dividing header center aligned"><br/>Add New Top Level Class Order</h2>

<div class="ui middle aligned center aligned grid">
  <form class="ui form" method="post" action="/class_order/class_order_new">
    <div class="fields">
      <div class="eight wide field">
        <label>Classification</label>
        <select name="classification_id">
          {% for cls in class_order %}
            <option value="{{cls.id}}" >
              {{cls.name}}
            </option>
          {% endfor %}
        </select>
      </div>
      <div class="eight wide field">
        <label>Top Level Class Order</label>
        <select name="level_order">
          {% for an in availableNumbers %}
            <option value="{{an}}" >
              {{an}}
            </option>
          {% endfor %}
        </select>
      </div>
    </div>
    <button type="submit" class="ui small button">Submit</button>
  </form>
</div>

{% endblock %}