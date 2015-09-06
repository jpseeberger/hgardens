{% extends 'inventory_layout.swig' %}

{% block content %}

<div class="ui middle aligned center aligned grid">
  <div class="column">
    <h2 class="ui teal header ">
      <div class="content">
        <br/>Manage Photos
      </div>
    </h2>
    <h4 class="ui dividing header">Current Photos</h4>
    <form method="get" action="/photos/photo_new">
      <button type="submit" class="ui small primary labeled button">
        Add New Photo
      </button>
    </form>
    <form method="get" action="/photos/photo_class_new">
      <button type="submit" class="ui small primary labeled button">
        Add Photo to Class
      </button>
    </form>
    <table class="ui compact celled table">
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th>Classification</th>
          <th>Associated Photo</th>
        </tr>
      </thead>
      <tbody id="indexedTable">
        {% for cps in class_photos %}
          <tr>
            <td><a href="/inventory/{{ cps.id }}">edit </a></td>
            <td><a href="/inventory/{{ cps.id }}/delete">delete </a></td>
            {% for cls2 in allClasses %}
              {% if cps.cid == cls2.id %}
                <td>
                  {{ cls2.name }}
                </td>
                  {% for ph in photos %}
                    {% if cps.pid == ph.id %}
                      <td>
                        {{ ph.photo_name }}
                      </td>
                    {% endif %}
                  {% endfor %}
              {% endif %}
            {% endfor %}
          </tr>
        {% endfor %}
      </tbody>
    </table>
  </div>
</div>

{% endblock %}