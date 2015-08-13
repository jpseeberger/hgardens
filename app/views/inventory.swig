<!DOCTYPE html>
<html>
<head>
  <!-- Standard Meta -->
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">

  <title>{{ title }}</title>
    
  <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
  <link rel="stylesheet" type="text/css" href="/semantic.min.css">
  <link rel="stylesheet" type="text/css" href="/css/inventory.css" media="screen">
</head>
<body>


<div class="ui middle aligned center aligned grid">
  <div class="column">
    <h2 class="ui teal header">
      <div class="content">
        Inventory Control
      </div>
    </h2>
    <h4 class="ui dividing header">Current Inventory</h4>
    <table class="ui compact celled definition table">
      <thead>
        <tr>
          <th></th>
          <th>Subcategory</th>
          <th>Price</th>
          <th>Unit</th>
          <th>Available</th>
          <th>Grower</th>
          <th>Next Week</th>
          <th>Photo</th>
        </tr>
      </thead>
      <tbody id="indexedTable">
        {% for item in inventory %}
            <tr>
              <td><a href="/inventory/{{ item.id }}">edit </a></td>
              <td>{{ item.subcategory }}</td>
              <td>{{ item.price }}</td>
              <td>{{ item.unit }}</td>
              <td>{{ item.unitsavailable }}</td>
              <td>{{ item.grower }}</td>
              <td>{{ item.available_next_week }}</td>
              <td>{{ item.photo }}</td>
            </tr>
        {% endfor %}
      </tbody>
      <tfoot class="full-width">
        <tr>
          <th></th>
          <th colspan="9">
          <form method="get" action="/inventory/new">
            <button type="submit" class="ui right floated small primary labeled button">
              Add New Item
            </button>
          </form>
          <form method="get" action="" id="editTableItem">
            <button type="submit" class="ui small button">
              Edit Item
            </button>
          </form>
          <form method="get" action="" id="deleteTableItem">
            <button type="submit" class="ui small button">
              Delete Item
            </button>
          </form>
          </th>
        </tr>
      </tfoot>
    </table>

{% block content %}{% endblock %}

  </div>
</div>
    
<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script src="/semantic.min.js"></script>
<script src="/js/inventory.js"></script>
</body>
</html>
