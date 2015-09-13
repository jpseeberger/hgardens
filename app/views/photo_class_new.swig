{% extends 'inventory_layout.swig' %}

{% block content %}

<h2 class="ui teal dividing header center aligned"><br/>Add Photo for Classification</h2>

<div class="ui middle aligned center aligned grid">
  <form class="ui form" method="post" action="/photos/photo_class_new">
    <div class="fields">
      <div class="eight wide field">
        <label>Classification</label>
        <select name="classification_id">
          {% for cls in classes %}
            <option value="{{cls.id}}" >
              {{cls.name}}
            </option>
          {% endfor %}
        </select>
      </div>
      <div class="eight wide field">
        <label>Photo Name</label>
        <select name="photo_id">
          {% for ph in photos %}
            <option value="{{ph.id}}" >
              {{ph.photo_name}}
            </option>
          {% endfor %}
        </select>
      </div>
    </div>
    <button type="submit" class="ui small button">Submit</button>
  </form>
</div>

{% endblock %}