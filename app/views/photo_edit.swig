{% extends 'inventory_layout.swig' %}

{% block content %}

<h2 class="ui teal dividing header center aligned"><br/>Edit Photo List</h2>

<div class="ui middle aligned center aligned grid">

  <form class="ui form" method="post" action="/photos/{{classes.cid}}"  id="editPhotoForm">
    <div class="fields">
      <div class="six wide field">
        <label>Classification</label>
        <select name="classification_id">
          <option value="{{classes.cid}}">
            {{classes.name}}
          </option>
        </select>
      </div>
      <div class="ten wide field">
        <label>Photo</label>
        <select name="photo_id">
          {% for ph in photos %}
            <option value="{{ph.id}}" {% if classes.pid == ph.id %}selected{% endif%}>
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
