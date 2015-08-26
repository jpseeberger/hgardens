{% extends 'inventory_layout.swig' %}

{% block content %}

<h2 class="ui teal dividing header center aligned"><br/>Edit Item</h2>

<div class="ui middle aligned center aligned grid">

  <form class="ui form" method="post" action="/inventory/{{item.id}}"  id="editItemForm">
    <div class="fields">
      <div class="two wide field">
        <label>Classification</label>
        <select name="classification_id">
          {% for cls in classes %}
            <option value="{{cls.id}}" {% if item.classification_id == cls.id %}selected{% endif%}>
              {{cls.name}}
            </option>
          {% endfor %}
        </select>
      </div>
      <div class="two wide field">
        <label>Unit</label>
        <input type="text" name="unit" value={{item.unit}}>
      </div>
      <div class="two wide field">
        <label>Price ($10.00 = 1000)</label>
        <input type="text" name="price" value={{item.price}}>
      </div>
      <div class="two wide field">
        <label>Units Available</label>
        <input type="text" name="unitsavailable" value={{item.unitsavailable}}>
      </div>
<!--       <div class="one wide field">
        <label>Grower</label>
        <input type="text" name="grower" value={{item.grower}}>
      </div>
-->

      <div class="two wide field">
        <label>Grower</label>
        <select name="grower">
          {% for gr in grower %}
            <option value="{{gr.id}}" {% if item.grower == gr.id %}selected{% endif%}>
              {{gr.name}}
            </option>
          {% endfor %}
        </select>
      </div>


      <div class="two wide field">
        <label>Next Week</label>
        <select name="nextWeek">
          {% for yes_no in yesNo %}
            <option value="{{yes_no.id}}" {% if item.available_next_week == yes_no.id %}selected{% endif%}>
              {{yes_no.name}}
            </option>
          {% endfor %}
        </select>
      </div>
      <div class="two wide field">
        <label>Full List</label>
        <select name="full_list">
          {% for yes_no in yesNo %}
            <option value="{{yes_no.id}}" {% if item.full_list == yes_no.id %}selected{% endif%}>
              {{yes_no.name}}
            </option>
          {% endfor %}
        </select>
      </div>
    </div>
    <button type="submit" class="ui small button">Submit</button>
  </form>
</div>

{% endblock %}
