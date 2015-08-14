<html>
<body>
{% block content %}
<form class="ui form" method="post" action="/inventory/{{item.id}}"  id="editItemForm">
  <div class="field">
    <div class="fields">
      <div class="two wide field">
      <div class="three wide field">
        <label>Classification</label>
        <select name="classification">
          {% for cls in classes %}
            <option value="{{cls.id}}" {% if item.classification_id == cls.id %}selected{% endif%}>
              {{cls.name}}
            </option>
          {% endfor %}
        </select>
      </div>
      <div class="two wide field">
        <label>price</label>
        <input type="text" name="price" value={{item.price}}>
      </div>
      <div class="two wide field">
        <label>unit</label>
        <input type="text" name="unit" value={{item.unit}}>
      </div>
      <div class="two wide field">
        <label>unitsavailable</label>
        <input type="text" name="unitsavailable" value={{item.unitsavailable}}>
      </div>
      <div class="two wide field">
        <label>grower</label>
        <input type="text" name="grower" value={{item.grower}}>
      </div>
      <div class="one wide field">
        <label>available_next_week</label>
        <input type="text" name="available_next_week" value={{item.available_next_week}}>
      </div>
      <div class="one wide field">
        <label>photo</label>
        <input type="text" name="photo" value={{item.photo}}>
      </div>
    </div>
  </div>
  <button type="submit" class="ui small button">Submit</button>
</form>


{% endblock %}
</body></html>