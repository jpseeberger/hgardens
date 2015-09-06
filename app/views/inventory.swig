{% extends 'inventory_layout.swig' %}

{% block content %}

<div class="ui middle aligned center aligned grid">
  <div class="column">
    <h2 class="ui teal header ">
      <div class="content">
        <br/>Inventory Control
      </div>
    </h2>
    <h4 class="ui dividing header">Current Inventory</h4>
    <form method="get" action="/inventory/new_item">
      <button type="submit" class="ui small primary labeled button">
        Add New Item
      </button>
    </form>
    <table class="ui compact celled table">
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th>Subcategory</th>
          <th>Unit</th>
          <th>Price</th>
          <th>Available</th>
          <th>Grower</th>
          <th>Next Week</th>
          <th>Full List</th>
          <th>Photo</th>
        </tr>
      </thead>
      <tbody id="indexedTable">
        {% for item in inventory %}
            <tr>
              <td><a href="/inventory/{{ item.id }}">edit </a></td>
              <td><a href="/inventory/{{ item.id }}/delete">delete </a></td>
              <td>{{ item.name }}</td>
              <td>{{ item.unit }}</td>
              <td>{{ item.price }}</td>
              <td>{{ item.unitsavailable }}</td>
              <td>{{ item.grower }}</td>
              <td>{{ item.available_next_week }}</td>
              <td>{{ item.full_list }}</td>
              <td>
                {% for cps in class_photos %}
                  {% if cps.cid == item.classification_id %}
                    {% for ph in photos %}
                      {% if cps.pid == ph.id %}
                        {{ ph.photo_name }}
                      {% endif %}
                    {% endfor %}
                  {% endif %}
                {% endfor %}
              </td>
            </tr>
        {% endfor %}
      </tbody>
    </table>
  </div>
</div>

{% endblock %}