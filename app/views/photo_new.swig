{% extends 'inventory_layout.swig' %}

{% block content %}

<h2 class="ui teal dividing header center aligned"><br/>Add New Photo</h2>

<div class="ui middle aligned center aligned grid">
  <form class="ui form" method="post" action="/photos/photo_new">
    <div class="fields">
      <div class="sixteen wide field">
        <label>Add New Photo Name</label>
        <input type="text" name="photo_name" placeholder="photo name.jpg">
      </div>
    </div>
    <button type="submit" class="ui small button">Submit</button>
  </form>
</div>

{% endblock %}