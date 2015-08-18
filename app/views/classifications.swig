{% extends 'inventory_layout.swig' %}

{% block content %}

<div class="ui middle aligned center aligned grid">
  <div class="column">
    <h2 class="ui teal header ">
      <div class="content">
        <br/>Classifications Control
      </div>
    </h2>
    <h4 class="ui dividing header">Current Classifications</h4>
    <form method="get" action="/classifications/new_class">
      <button type="submit" class="ui small primary labeled button">
        Add New Classification
      </button>
    </form>
    <table class="ui compact celled table">
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th>Classification</th>
          <th>Parent Classification</th>
        </tr>
      </thead>
      <tbody id="indexedTable">
        {% for cls in classifications %}
            <tr>
              <td><a href="/inventory/{{ cls.id }}">edit </a></td>
              <td><a href="/inventory/{{ cls.id }}/delete">delete </a></td>
              <td>{{ cls.name }}</td>
              <td>
                {% if cls.parent_id != null %}
                  {% for cls2 in classifications %}
                    {% if cls.parent_id == cls2.id %}{{ cls2.name }}{% endif %}
                  {% endfor %}
                {% else %}
                  Top Level Classification
                {% endif %}
              </td>
            </tr>
        {% endfor %}
      </tbody>
    </table>
  </div>
</div>

{% endblock %}