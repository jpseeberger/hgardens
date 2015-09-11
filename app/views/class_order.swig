{% extends 'inventory_layout.swig' %}

{% block content %}

<h2 class="ui teal dividing header center aligned"><br/>Top Level Classification Order</h2>

<div class="ui middle aligned center aligned grid">
  <div class="column">
    <h2 class="ui teal header ">
      <div class="content">
        <br/>Manage Order In Which Top Level Categories Appear on the Home Page
      </div>
    </h2>
    <h4 class="ui dividing header">Current Top Level Order</h4>
    <form method="get" action="/class_order/class_order_new">
      <button type="submit" class="ui small primary labeled button">
        Add Top Level Order to Class
      </button>
    </form>
    <table class="ui compact celled table">
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th>Classification</th>
          <th>Top Level Order Appearing on Home Page</th>
        </tr>
      </thead>
      <tbody id="indexedTable">
        {% for cls in class_order %}
          <tr>
            <td><a href="/class_order/{{ cls.classification_id }}">edit </a></td>
            <td><a href="/class_order/{{ cls.classification_id }}/delete">delete </a></td>
            <td>
              {{ cls.name }}
            </td>
            <td>
              {{ cls.level_order }}
            </td>
          </tr>
        {% endfor %}
      </tbody>
    </table>
  </div>
</div>

{% endblock %}