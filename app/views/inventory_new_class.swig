{% extends 'inventory_layout.swig' %}

{% block content %}
<form class="ui form" method="post" action="/inventory">
  <div class="field">
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
      <div class="three wide field">
        <input type="text" name="subcategory" placeholder="subcategory">
      </div>
      <div class="two wide field">
        <input type="text" name="unit" placeholder="unit">
      </div>
      <div class="two wide field">
        <input type="text" name="price" placeholder="price">
      </div>
      <div class="two wide field">
        <input type="text" name="unitsavailable" placeholder="# available">
      </div>
      <div class="two wide field">
        <input type="text" name="grower" placeholder="grower">
      </div>
      <div class="one wide field">
        <label>Next Week</label>
        <select name="nextWeek">
          {% for yes_no in yesNo %}
            <option value="{{yes_no.id}}">
              {{yes_no.name}}
            </option>
          {% endfor %}
        </select>
      </div>
      <div class="one wide field">
        <label>Photo</label>
        <select name="photo">
          {% for yes_no in yesNo %}
            <option value="{{yes_no.id}}">
              {{yes_no.name}}
            </option>
          {% endfor %}
        </select>
      </div>
    </div>
  </div>
  <button type="submit" class="ui small button">Submit</button>
</form>


{% endblock %}