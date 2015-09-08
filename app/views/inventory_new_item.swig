{% extends 'inventory_layout.swig' %}

{% block content %}

<h2 class="ui teal dividing header center aligned"><br/>Add New Item</h2>

<div class="ui middle aligned center aligned grid">
  <form class="ui form" method="post" action="/inventory">
    <div class="fields">
      <div class="two wide field">
        <label>Classification</label>
        <select name="classification">
          {% for cls in classes %}
            <option value="{{cls.id}}" >
              {{cls.name}}
            </option>
          {% endfor %}
        </select>
      </div>
      <div class="two wide field">
        <label>Unit</label>
        <select name="unit">
          {% for un in unit %}
            <option>
              {{un.name}}
            </option>
          {% endfor %}
        </select>
      </div>
      <div class="two wide field">
        <label>Price ($10.00 = 1000)</label>
        <input type="text" name="price" placeholder="price">
      </div>
      <div class="two wide field">
        <label>Units Available</label>
        <input type="text" name="unitsavailable" placeholder="# available">
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
              <option>
                {{gr.name}}
              </option>
            {% endfor %}
          </select>
        </div>

      <div class="two wide field">
        <label>Next Week</label>
        <select name="available_next_week">
          {% for yes_no in yesNo %}
            <option value="{{yes_no.id}}">
              {{yes_no.name}}
            </option>
          {% endfor %}
        </select>
      </div>
      <div class="one wide field">
        <label>Full List</label>
        <select name="full_list">
          {% for yes_no in yesNo %}
            <option value="{{yes_no.id}}">
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