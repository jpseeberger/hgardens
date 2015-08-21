{% extends 'inventory_layout.swig' %}

{% block content %}

<h2 class="ui teal dividing header center aligned"><br/>Add New Classification</h2>

<div class="ui middle aligned center aligned grid">
  <form class="ui form" method="post" action="/classifications">
    <div class="fields">
      <div class="eight wide field">
        <label>New Classification</label>
        <input type="text" name="new_item" placeholder="new item name">
      </div>
      <div class="eight wide field">
        <label>Parent Classification</label>
        <select name="parent_id">
          {% for cls in classes %}
            <option value="{{cls.id}}" >
              {{cls.name}}
            </option>
          {% endfor %}
          <option>null</option>
        </select>
      </div>
    </div>
    <button type="submit" class="ui small button">Submit</button>
  </form>
</div>

{% endblock %}